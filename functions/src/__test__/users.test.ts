import request from "supertest";

const BASE_URL = "http://127.0.0.1:5001/fir-functions-9c002/us-central1/wb";
const adminKey = process.env.SYSTEM_ADMIN_KEY;

import { SAdminToken as SuperAdminToken } from "./sum.test.js";
import { TEST_CONSTANT } from "../constants/test_case.js";
let userId: string;
describe("POST api for all /api/users", () => {
    it("should create a new system user and return with role", async () => {
        const nUser = {
            firstname: TEST_CONSTANT.USER.CREATE_SYSTEMADMIN.FIRSTNAME,
            lastname: TEST_CONSTANT.USER.CREATE_SYSTEMADMIN.LASTNAME,
            email: TEST_CONSTANT.USER.CREATE_SYSTEMADMIN.EMAIL
        };

        const response = await request(BASE_URL)
            .post("/api/users/system-admin")
            .set("x-api-key",adminKey)
            .send(nUser)
            .expect(200);

        expect(response.body).toHaveProperty("success", true);
        expect(response.body.data).toHaveProperty("role");
    }, 20000);

    it("should return an error when the email already exists", async () => {
        const userData = {
            firstname:TEST_CONSTANT.USER.CREATE_SYSTEMADMIN.FIRSTNAME,
            lastname: TEST_CONSTANT.USER.CREATE_SYSTEMADMIN.LASTNAME,
            email: TEST_CONSTANT.USER.LOGIN_SYSTEMADMIN.EMAIL,
        };

        const response = await request(BASE_URL)
            .post("/api/users/system-admin")
            .set("x-api-key", adminKey)
            .send(userData)
            .expect(500);

        expect(response.body).toHaveProperty("success", false);
    });

    it("should return 401 Unauthorized with invalid x-api-key", async () => {
        const userData = {
            email: TEST_CONSTANT.USER.CREATE_USER.EMAIL,
            firstname: TEST_CONSTANT.USER.CREATE_USER.FIRSTNAME,
            lastname: TEST_CONSTANT.USER.CREATE_USER.LASTNAME,
        };

        const res = await request(BASE_URL)
            .post("/api/users/system-admin")
            .set("x-api-key", "invalid-api-key")
            .send(userData)
            .expect(401);

        expect(res.body.error).toBe("Unauthorized");
    }, 20000);

    it("should return 400 Bad Request with invalid email", async () => {
        const userData = {
            email:  TEST_CONSTANT.USER.INVALID_CRED.EMAIL,
            firstname: TEST_CONSTANT.USER.CREATE_USER.FIRSTNAME,
            lastname: TEST_CONSTANT.USER.CREATE_USER.LASTNAME,
        };

        const res = await request(BASE_URL)
            .post("/api/users/system-admin")
            .set("x-api-key", adminKey)
            .send(userData)
            .expect(400);

        expect(res.body.error).toBe("Invalid data");
    });

    it("should return 400 Bad Request with missing fields", async () => {
        const userData = {
            email:TEST_CONSTANT.USER.CREATE_USER.EMAIL,
        };

        const res = await request(BASE_URL)
            .post("/api/users/system-admin")
            .set("x-api-key", adminKey)
            .send(userData)
            .expect(400);

        expect(res.body.error).toBe("Invalid data");
        expect(res.body.details).toContainEqual(
            expect.objectContaining({ message: "firstname is Required" })
        );
        expect(res.body.details).toContainEqual(
            expect.objectContaining({ message: "lastname is Required" })
        );
    });

    describe("POST /api/users", () => {
        it("should create a new user", async () => {
            const wuser = {
                email:  TEST_CONSTANT.USER.CREATE_USER.EMAIL,
                firstname: TEST_CONSTANT.USER.CREATE_USER.FIRSTNAME,
                lastname: TEST_CONSTANT.USER.CREATE_USER.LASTNAME,
            };
            const response = await request(BASE_URL)
                .post("/api/users")
                .set("Authorization", `Bearer ${SuperAdminToken}`)
                .send(wuser)
                .expect(200);

            expect(response.body).toHaveProperty("success", true);
            expect(response.body.data).toHaveProperty("id");
            userId = response.body.data.id;
        },20000);

        it("should return an error when the email already exists", async () => {
            const userData = {
                firstname:  TEST_CONSTANT.USER.CREATE_USER.FIRSTNAME,
                lastname: TEST_CONSTANT.USER.CREATE_USER.LASTNAME,
                email:TEST_CONSTANT.USER.CREATE_USER.EMAIL,
            };
    
            const response = await request(BASE_URL)
                .post("/api/users")
                .set("Authorization", `Bearer ${SuperAdminToken}`)
                .send(userData)
                .expect(500);
    
            expect(response.body).toHaveProperty("success", false);
        });
    });

    describe("GET /api/users/:id", () => {
        it("should get a user by ID", async () => {
            const response = await request(BASE_URL)
                .get(`/api/users/${userId}`)
                .set("Authorization", `Bearer ${SuperAdminToken}`)
                .expect(200);

            expect(response.body).toHaveProperty("success", true);
        });

        it("should return an error when the user ID does not exist", async () => {
            const nonExistentUserId = TEST_CONSTANT.USER.INVALID_CRED.USERID;
            const response = await request(BASE_URL).get(
                `/api/users/${nonExistentUserId}`
            );
            expect(response.body).toHaveProperty("success", false);
        });
    });

    describe("PUT /api/users/:id", () => {
        it("should update a user", async () => {
            const updatedUser = {
                firstname:TEST_CONSTANT.USER.CREATE_USER.FIRSTNAME,
                lastname:TEST_CONSTANT.USER.CREATE_USER.LASTNAME,
                email:TEST_CONSTANT.USER.UPDATE_CRED.EMAIL,
            };

            const response = await request(BASE_URL)
                .put(`/api/users/${userId}`)
                .set("Authorization", `Bearer ${SuperAdminToken}`)
                .send(updatedUser)
                .expect(200);
            expect(response.body).toHaveProperty("success", true);
        });

        it("should return an error when the user ID does not exist", async () => {
            const nonExistentUserId = TEST_CONSTANT.USER.INVALID_CRED.USERID;
            const updatedUser = {
                firstname:TEST_CONSTANT.USER.CREATE_USER.FIRSTNAME,
                lastname:TEST_CONSTANT.USER.CREATE_USER.LASTNAME,
                email:TEST_CONSTANT.USER.UPDATE_CRED.EMAIL,
            };
            const response = await request(BASE_URL)
                .put(`/api/users/${nonExistentUserId}`)
                .set("Authorization", `Bearer ${SuperAdminToken}`)
                .send(updatedUser);

            expect(response.body).toHaveProperty("success", false);
        });
    });

    describe("DELETE /api/users/:id", () => {
        it("should delete a user", async () => {
            const response = await request(BASE_URL)
                .delete(`/api/users/${userId}`)
                .set("Authorization", `Bearer ${SuperAdminToken}`)
                .expect(200);

            expect(response.body).toHaveProperty("success", true);
        });
    });
});

describe("Example test", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    });
});
