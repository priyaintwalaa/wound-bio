import request from "supertest";
import { TEST_CONSTANT } from "./test_case.js";

const BASE_URL = "http://127.0.0.1:5001/fir-functions-9c002/us-central1/wb";

describe("Auth Route Api", () => {
    it("should login with correct credentials", async () => {
        const loginData = {
            email: TEST_CONSTANT.USER.LOGIN_SYSTEMADMIN.EMAIL,
            password: TEST_CONSTANT.USER.LOGIN_SYSTEMADMIN.PASSWORD,
        };

        const res = await request(BASE_URL)
            .post("/api/auth/login")
            .send(loginData)
            .expect(200);

        expect(res.body).toHaveProperty("success", true);
    });

    it("should not login with incorrect credentials", async () => {
        const loginData = {
            email: TEST_CONSTANT.AUTH.INVALID_MAIL,
            password: TEST_CONSTANT.USER.LOGIN_SYSTEMADMIN.PASSWORD,
        };
        const res = await request(BASE_URL)
            .post("/api/auth/login")
            .send(loginData)
            .expect(401);

        expect(res.body).toHaveProperty("success", false);
    });

    it("should get mail if clicked to forget password", async () => {
        const forgetSchema = {
            email: TEST_CONSTANT.USER.LOGIN_SYSTEMADMIN.EMAIL,
        };
        const response = await request(BASE_URL)
            .post("/api/auth/forgot-password")
            .send(forgetSchema)
            .expect(200);

        expect(response.body).toHaveProperty("success", true);
    },20000);

    it("should get error if trying with invalid email for forget password", async () => {
        const forgetSchema = {
            email:TEST_CONSTANT.AUTH.INVALID_MAIL ,
        };
        const response = await request(BASE_URL)
            .post("/api/auth/forgot-password")
            .send(forgetSchema)
            .expect(401);

        expect(response.body).toHaveProperty("success", false);
    });
});
