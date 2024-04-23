import { NextFunction, Request, Response } from "express";
import CustomError from "../models/customError.js";

const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || "Internal Server Error",
    });
};

export default errorHandler;
