import request from "supertest";

const BASE_URL = "http://127.0.0.1:5001/fir-functions-9c002/us-central1/wb";

describe("Auth Route Api", () => {
    it("should login with correct credentials", async () => {
        const loginData = {
            email: "hello@bacancy.com",
            password: "728b579941",
        };

        const res = await request(BASE_URL)
            .post("/api/auth/login")
            .send(loginData)
            .expect(200);

        expect(res.body).toHaveProperty("success", true);
    });

    it("should login with incorrect credentials", async () => {
        const loginData = {
            email: "invalid@bacancy.com",
            password: "a66bd199ea",
        };
        const res = await request(BASE_URL)
            .post("/api/auth/login")
            .send(loginData)
            .expect(401);

        expect(res.body).toHaveProperty("success", false);
    });

    it("forget password", async () => {
        const forgetSchema = {
            email: "hello@bacancy.com",
        };
        const response = await request(BASE_URL)
            .post("/api/auth/forgot-password")
            .send(forgetSchema)
            .expect(200);

        expect(response.body).toHaveProperty("success", true);
    },20000);

    it("forget password with invalid email", async () => {
        const forgetSchema = {
            email: "invalid_email@bacancy.com",
        };
        const response = await request(BASE_URL)
            .post("/api/auth/forgot-password")
            .send(forgetSchema)
            .expect(401);

        expect(response.body).toHaveProperty("success", false);
    });
});
