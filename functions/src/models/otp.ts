import { FieldValue, Timestamp } from "firebase-admin/firestore";

export interface Otp {
    email: string;
    otp: string;
    expiredTime: Timestamp;
    createdAt: FieldValue;
}


export type OtpResponse = Omit<
    Otp,
    "createdAt"
>;