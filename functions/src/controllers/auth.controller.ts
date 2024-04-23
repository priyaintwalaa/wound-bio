import { NextFunction, Request, Response } from "express";
import CustomError from "../models/customError.js";
import { AuthService } from "../services/auth.service.js";
import CustomResponse from "../models/customResponse.js";
import asyncHandler from "../utils/catchAsync.util.js";

export class AuthController {
    private authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    }

    async register() {}

    login = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                console.log(req.body);
                const { email, password } = req.body;
                const { user, token } = await this.authService.login(
                    email,
                    password
                );
                return res.status(200).json(
                    new CustomResponse(true, "Login Successful", {
                        user,
                        token,
                    })
                );
            } catch (err: any) {
                next(new CustomError(err.message, 401));
            }
        }
    );

    forgotPassword = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                console.log(req.body);
                const { email } = req.body;
                await this.authService.forgotPassword(email);
                return res
                    .status(200)
                    .json(
                        new CustomResponse(true, "Mail sent successfully", {})
                    );
            } catch (err: any) {
                next(new CustomError(err.message, 401));
            }
        }
    );

    resetPassword = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                console.log(req.body);
                const { code, email, newPassword } = req.body;
                await this.authService.resetPassword(code, email, newPassword);
                return res
                    .status(200)
                    .json(
                        new CustomResponse(
                            true,
                            "Password Updated successfully",
                            {}
                        )
                    );
            } catch (err: any) {
                next(new CustomError(err.message, 401));
            }
        }
    );
}
