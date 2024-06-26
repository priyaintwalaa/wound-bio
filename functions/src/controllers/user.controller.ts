import { Request, Response } from "express";
import UserService from "../services/user.service.js";
import { Roles } from "../constants/enums.js";
import { User } from "../models/user.js";
import CustomResponse from "../models/customResponse.js";
import { UserMapper } from "../mappers/user.mapper.js";
import CustomError from "../models/customError.js";
import asyncHandler from "../utils/catchAsync.util.js";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    getUser = asyncHandler(async (req: Request, res: Response) => {
        const user: User = await this.userService.getUserById(req.params.id);
        const userMapper = new UserMapper();
        const userResponse = userMapper.generateUserResponse(user);
        return res
            .status(200)
            .json(new CustomResponse(true, null, userResponse));
    });

    createUser = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);
        const user: User = req.body;
        const { id, password } = await this.userService.createUser(user);
        await this.userService.sendCredsEmailToUser({
            firstname: user.firstname,
            lastname: user.lastname,
            toEmailAddress: user.email,
            password,
        });
        return res.status(200).json(
            new CustomResponse(true, "User created successfully", {
                id,
            })
        );
    });

    createSystemAdmin = asyncHandler(async (req: Request, res: Response) => {
        //Step1: Allow only if have valid API key to create system admin
        // console.log(req.body, "createSystemAdmin");
        if (req.headers["x-api-key"] != process.env.SYSTEM_ADMIN_KEY) {
            throw new CustomError("Unauthorized", 401);
        }
        //Step2: Add system admin in DB
        const user: User = req.body;
        user.role = Roles.SYSTEM_ADMIN;
        // console.log("Creating user:", user);
        const { password } = await this.userService.createUser(user);
        // console.log("User created with password:", password);
        //Step3: Send email with temp creds to system admin email
        await this.userService.sendCredsEmailToUser({
            firstname: user.firstname,
            lastname: user.lastname,
            toEmailAddress: user.email,
            password,
        });
        // console.log("Email sent to user:", user.email);
        const userMapper = new UserMapper();
        const userResponse = userMapper.generateUserResponse(user);

        // console.log("User response:", userResponse);
        
        return res
            .status(200)
            .json(
                new CustomResponse(
                    true,
                    "User created succesfully",
                    userResponse
                )
            );
    });

    updateUser = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);
        const user: User = req.body;
        user.id = req.params.id;
        await this.userService.updateUser(user);
        return res
            .status(200)
            .json(new CustomResponse(true, "User updated succesfully", user));
    });

    // updateUserStatus = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         console.log(req.body.isActive);
    //         await this.userService.updateUserStatus(req.params.id, req.body.isActive);
    //         return res.status(200).json(new CustomResponse(true, "User status updated succesfully", {}));
    //     } catch (err:any) {
    //         next(err);
    //     }
    // }

    deleteUser = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);
        await this.userService.deleteUser(req.params.id);
        return res
            .status(200)
            .json(new CustomResponse(true, "User deleted succesfully", {}));
    });

    getToken = asyncHandler(async (req: Request, res: Response) => {
        console.log(req.body);
        const token = await this.userService.getToken(req.params.id);
        return res.status(200).json(new CustomResponse(true, "", { token }));
    });
}
