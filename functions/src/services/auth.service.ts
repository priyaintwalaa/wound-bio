import { Timestamp } from "firebase-admin/firestore";
import { User, UserResponse } from "../models/user.js";
import {
    compareText,
    generateRandomText,
    hashRandomText,
} from "../utils/pwd.util.js";
import UserService from "./user.service.js";
import jwt from "jsonwebtoken";
import { UserMapper } from "../mappers/user.mapper.js";
import EmailService from "./email.service.js";

export class AuthService {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    login = async (email: string, password: string) => {
        let user: User;
        try {
            user = await this.userService.getUserByEmail(email);
        } catch (err: any) {
            throw new Error("INVALID_CREDS");
        }
        if (user.isLocked == false) {
            const isUserAuthanticated = compareText(
                password,
                user.password.hash,
                user.password.salt
            );
            if (!isUserAuthanticated) {
                throw new Error("INVALID_CREDS");
            }
            const userMapper = new UserMapper();
            const userResponse: UserResponse =
                userMapper.generateUserResponse(user);
            const token = jwt.sign(
                userResponse,
                process.env.JWT_SECRET_KEY as jwt.Secret,
                {
                    expiresIn: "1h",
                }
            );
            return { token, user: userResponse };
        } else {
            throw new Error("USER_LOCKED");
        }
    };

    forgotPassword = async (email: string) => {
        const user: User = await this.userService.getUserByEmail(email);
        if (!user) throw new Error("USER_NOT_REGISTERED");

        //Step1 : Generate code and save it in database with hashed version
        const code = generateRandomText(5);
        const { hashedText, salt } = hashRandomText(code);

        const now = Timestamp.now();
        const twentyFourHoursFromNow = new Timestamp(
            now.seconds +
                (Number(process.env.CODE_EXPIRTY_IN_MINUTES) / 60) * 60 * 60,
            now.nanoseconds
        );

        //Step2: Save hash version of token in database
        user.resetPasswordToken = {
            hash: hashedText,
            expiredTime: twentyFourHoursFromNow,
            salt,
        };

        const userService = new UserService();
        await userService.updateUser(user);
        //Step3: Send link via email to user with token and userid
        const emailService = new EmailService();
        const mailOptions: any = {
            to: user.email,
            template: "forgot-password",
            subject: "Forgot Password OTP for Wound Biologics",
            context: {
                code,
                firstname: user.firstname || "",
                lastname: user.lastname || "",
                expiryInMinutes: process.env.CODE_EXPIRTY_IN_MINUTES,
            },
        };
        await emailService.sendMail(mailOptions);
    };

    resetPassword = async (
        code: string,
        email: string,
        newPassword: string
    ) => {
        //Step1: Check reset password token exist for user
        const user: User = await this.userService.getUserByEmail(email);
        if (!user) throw new Error("USER_NOT_REGISTERED");

        if (!user.resetPasswordToken?.hash)
            throw new Error("INVALID_RESET_REQUEST");

        const expiryDate = user.resetPasswordToken.expiredTime;
        const now = Timestamp.now();

        if (expiryDate.seconds < now.seconds) {
            throw new Error("EXPIRED_CODE");
        }
        //Step2: Compare code from body and database with hash
        const isValid: boolean = compareText(
            code,
            user.resetPasswordToken.hash,
            user.resetPasswordToken.salt
        );
        if (!isValid) throw new Error("INVALID_CODE");
        //Step3: Update new password
        console.log("password", newPassword);
        const { hashedText, salt } = hashRandomText(newPassword);
        user.password = { hash: hashedText, salt };
        delete user.resetPasswordToken;
        const userService = new UserService();
        await userService.updateUser(user);
        //Step4: Inform user that password updated successfully
        return;
    };

    generateToken(userData: UserResponse) {
        const token = jwt.sign(
            userData,
            process.env.JWT_SECRET_KEY as jwt.Secret,
            {
                expiresIn: "1h",
            }
        );

        return token;
    }

    sendOtp = async (email: string) => {
        const user: User = await this.userService.getUserByEmail(email);
        if (!user) throw new Error("USER_NOT_REGISTERED");

        const code = generateRandomText(5);

        const emailService = new EmailService();
        const mailOptions: any = {
            to: user.email,
            template: "verification-otp",
            subject: "Verification OTP to Unlock your Wound Biologics account",
            context: {
                code,
                firstname: user.firstname || "",
                lastname: user.lastname || "",
                expiryInMinutes: process.env.CODE_EXPIRTY_IN_MINUTES,
            },
        };
        await emailService.sendMail(mailOptions);

        await this.userService.updateUser({ ...user, otp: code });
    };

    verifyOtp = async (email: string, otp: string) => {
        const user: User = await this.userService.getUserByEmail(email);
        if (!user) throw new Error("USER_NOT_REGISTERED");

        if (user.otp !== otp) throw new Error("INVALID_OTP");

        await this.userService.updateUser({
            ...user,
            isLocked: false,
            otp: null,
        });
    };
}
