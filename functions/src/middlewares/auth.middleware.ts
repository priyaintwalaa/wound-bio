import jwt from "jsonwebtoken";
import CustomError from "../models/customError.js";
import { Roles } from "../constants/enums.js";
import { NextFunction, Response } from "express";
import { ExtendedExpressRequest } from "../models/extendedExpressRequest.js";
import { logger } from "firebase-functions";
// import rateLimit from "express-rate-limit";
import UserService from "../services/user.service.js";
import { firebaseAuth } from "../config/firebase.config.js";
import rateLimiter from "./ratelimit.middleware.js";

export function verifyToken(
    req: ExtendedExpressRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.header("Authorization");
    console.log(authHeader, "verifyToken");
    if (!authHeader) return next(new CustomError("Unauthorized", 401));

    // Split header and check format
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
        return res
            .status(401)
            .json({ message: "Invalid authorization format" });
    }
    // Extract the token
    const token = parts[1];
    try {
        const decodedJwt: any = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY as jwt.Secret
        );
        req.user = decodedJwt;
        logger.info(req.user);
        next();
    } catch (err: any) {
        if (err.name == "TokenExpiredError") {
            next(new CustomError("SESSION_EXPIRED", 401));
        } else {
            next(new CustomError("Unauthorized", 401));
        }
    }
}

export function verfiyRole(expectedRole: string[]) {
    return function (
        req: ExtendedExpressRequest,
        res: Response,
        next: NextFunction
    ) {
        console.log("in verify role");
        console.log(req.user.role);
        if (expectedRole.includes(req.user.role)) next();
        else next(new CustomError("Unauthorized", 401));
    };
}

export const isCompanyAdmin = async (
    req: ExtendedExpressRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (
            req.user.companyId == req.params.companyId &&
            req.user.role == Roles.COMPANY_ADMIN
        ) {
            next();
        } else {
            next(new CustomError("Unauthorized", 401));
        }
    } catch (e) {
        console.log(e);
        return res.status(401).json({ message: "Unauthenticated" });
    }
};

export const isSystemAdminOrCompanyAdmin = async (
    req: ExtendedExpressRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        if (
            (req.user.companyId == req.params.companyId &&
                req.user.role == Roles.COMPANY_ADMIN) ||
            req.user.role == Roles.SYSTEM_ADMIN
        ) {
            console.log("in if");

            next();
        } else {
            next(new CustomError("Unauthorized", 401));
        }
    } catch (e) {
        console.log(e);
        return res.status(401).json({ message: "Unauthenticated" });
    }
};

export const verifyFirebaseIdToken = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) return next(new CustomError("Unauthorized", 401));
    // Split header and check format
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
        return res
            .status(401)
            .json({ message: "Invalid authorization format" });
    }
    // Extract the token
    const token = parts[1];
    try {
        const decodeValue = await firebaseAuth.verifyIdToken(token);
        if (decodeValue) {
            req.user = decodeValue;
            return next();
        }
    } catch (e) {
        console.log(e);
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export const rateLimiting = async (
    req: ExtendedExpressRequest,
    res: Response,
    next: NextFunction
) => {
    // rateLimit({
    //     windowMs: 10 * 60 * 1000, //
    //     max: 5, // maximum 5 attempts
    //     handler: async () => {
    //         try {
    //             const userService = new UserService();
    //             const user = await userService.getUserByEmail(req.body.email);
    //             await userService.updateUser({...user, isLocked: true});
    //             next(
    //                 new CustomError(
    //                     "Too many requests, your account is temporarily locked.",
    //                     429
    //                 )
    //             );
    //         } catch (error) {
    //             console.error("Error updating user document:", error);
    //             next(new CustomError("Internal Server Error", 500));
    //         }
    //     },
    //     message: "Too many requests,Your account is temporarily locked. Please contact to Wound Bio group to unlock!",
    // });
    try {
        await rateLimiter(req, res, next); // Use the rateLimiter instance
    } catch (err) {
        // Handle the rate limiting error
        if (err.statusCode === 429) {
            const userService = new UserService();
            const user = await userService.getUserByEmail(req.body.email);
            await userService.updateUser({ ...user, isLocked: true });
            next(
                new CustomError(
                    "Too many requests, your account is temporarily locked. PLease contact Wound Biologics team to unlock",
                    429
                )
            );
        } else {
            console.error("Error updating user document:", err);
            next(new CustomError("Internal Server Error", 500));
        }
    }
};
