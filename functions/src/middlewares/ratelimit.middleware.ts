import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 3, // maximum 3 attempts
    message:
        "Too many requests, Your account is temporarily locked. Please contact to Wound Bio group to unlock!",
});

export default rateLimiter;
