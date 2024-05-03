import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { Roles } from "../constants/enums.js";
export interface User {
    id: string;
    username: string;
    firstname: string;
    lastname: string;
    password: {
        hash: string;
        salt: string;
    };
    email: string;
    role: Roles;
    roleId: string;
    companyId: string;
    isActive: true;
    resetPasswordToken: {
        hash: string;
        salt: string;
        expiredTime: Timestamp;
    };
    createdAt: FieldValue;
    isLocked: boolean;
    otp: string;
}

export type UserResponse = Omit<
    User,
    "password" | "resetPasswordToken" | "createdAt"
>;
