import request from "supertest";

const BASE_URL = "http://127.0.0.1:5001/fir-functions-9c002/us-central1/wb";
const adminKey = process.env.SYSTEM_ADMIN_KEY;
// // import { token as SuperAdminToken} from "./company.test.js";

export let SuperAdminToken: string;
export let userIdSuperadmin: string;

let userId: string;
describe("POST api for all /api/users", () => {
    beforeAll(async () => {
        const loginData = {
            email: "hello@bacancy.com",
            password: "72c20ad0b4",
        };

        const res = await request(BASE_URL)
            .post("/api/auth/login")
            .send(loginData)
            .expect(200);

        expect(res.body).toHaveProperty("success", true);
        SuperAdminToken = res.body.data.token;
        userIdSuperadmin = res.body.data.user.id;
    });
    it("should create a new system user and return with role", async () => {
        const nUser = {
            firstname: "heell",
            lastname: "heell",
            email: "firstSuperrr@bacancy.com"
        };

        const response = await request(BASE_URL)
            .post("/api/users/system-admin")
            .set("x-api-key",adminKey)
            .send(nUser)
            .expect(200);

        expect(response.body).toHaveProperty("success", true);
        expect(response.body.data).toHaveProperty("role");
    }, 20000);

    it("should return 401 Unauthorized with invalid x-api-key", async () => {
        const userData = {
            email: "mydata0704@gmail.com",
            firstname: "John",
            lastname: "Doe",
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
            email: "invalid-email",
            firstname: "John",
            lastname: "Doe",
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
            email: "mydata0704@gmail.com",
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
                firstname: "kllek",
                lastname: "kkel",
                email: "userfirst@ebacancy.com",
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
            const nonExistentUserId = "invalid-user-id";
            const response = await request(BASE_URL).get(
                `/api/users/${nonExistentUserId}`
            );

            expect(response.body).toHaveProperty("success", false);
        });
    });

    describe("PUT /api/users/:id", () => {
        it("should update a user", async () => {
            const updatedUser = {
                firstname: "Jane",
                lastname: "NGO",
                email: "updating@example.com",
            };

            const response = await request(BASE_URL)
                .put(`/api/users/${userId}`)
                .set("Authorization", `Bearer ${SuperAdminToken}`)
                .send(updatedUser)
                .expect(200);

            expect(response.body).toHaveProperty("success", true);
        });

        it("should return an error when the user ID does not exist", async () => {
            const nonExistentUserId = "invalid-user-id";
            const updatedUser = {
                firstname: "Jane",
                lastname: "Smith",
                email: "janesmith@example.com",
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
        // it("should return an error when the user ID does not exist", async () => {
        //     const nonExistentUserId = "invalid-user-id";

        //     const response = await request(BASE_URL)
        //         .delete(`/api/users/${nonExistentUserId}`)
        //         .set("Authorization", `Bearer ${SuperAdminToken}`);

        //     expect(response.body).toHaveProperty("success", true);
        // });
    });
});

describe("Example test", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    });
});
