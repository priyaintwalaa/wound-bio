import { Timestamp } from "firebase-admin/firestore";

export interface Otp {
    email: string;
    otp: string;
    expiredTime: Timestamp;
}