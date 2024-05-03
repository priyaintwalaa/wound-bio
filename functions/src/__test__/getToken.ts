import request from "supertest";
import { TEST_CONSTANT } from "./test_case.js";

export const loginUser = async (email: string, password: string) => {
    const loginData = {
        email,
        password,
    };
    const res = await request(TEST_CONSTANT.BASE_URL)
        .post("/api/auth/login")
        .send(loginData)
        .expect(200);

    expect(res.body).toHaveProperty("success", true);
    const response = res.body.data;
    return response;
};
