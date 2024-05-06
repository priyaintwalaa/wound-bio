import { Otp, OtpResponse } from "../models/otp.js";
import { firebaseDB } from "../config/firebase.config.js";
import { FIREBASE_CONSTANTS } from "../constants/firebase.js";

const otpCollection = firebaseDB.collection(FIREBASE_CONSTANTS.FIRESTORE.OTP);

export default class OptService {
    constructor() {}

    createOtp = async (otp: Otp) => {
        const docRef = otpCollection;
        await docRef.add(otp);
    };

    getLatestOtpByEmail = async (email: string) => {
        const querySnapshot = await otpCollection
            .where("email", "==", email)
            .orderBy("createdAt", "desc")
            .limit(1)
            .get();

        if (querySnapshot.empty) {
            return null;
        }

        const latestOtpDoc = querySnapshot.docs[0];
        const data = latestOtpDoc.data();
        const latestOtp: OtpResponse = {
            email: data.email,
            otp: data.otp,
            expiredTime: data.expiredTime,
        };

        return latestOtp;
    };
}
