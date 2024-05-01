import request from "supertest";
const BASE_URL = "http://127.0.0.1:5001/fir-functions-9c002/us-central1/wb";
// import { SuperAdminToken as token } from "./users.test.js";
// import { userIdSuperadmin as userIdSuperAdmin } from "./users.test.js";

export let companyId: string;
export let token: string;
let userId: string;
let companyToken: string;
let companyIdAdmin: string;
let UserIdCompany: string;
const loginData = {
    email: "hello@bacancy.com",
    password: "ace08c5120",
};
const companyLoginData = {
    email: "johndowswee@example.com",
    password: "b2bbfe44c3",
};

describe("company API ", () => {
    beforeAll(async () => {
      

        const res = await request(BASE_URL)
            .post("/api/auth/login")
            .send(loginData)
            .expect(200);

        expect(res.body).toHaveProperty("success", true);
        token = res.body.data.token;
    });
    it("return token for a valid user and create company", async () => {
        const companyName = {
            name: "Premium",
        };

        const companyData = await request(BASE_URL)
            .post("/api/companies")
            .set("Authorization", `Bearer ${token}`)
            .send(companyName)
            .expect(200);

        expect(companyData.body).toHaveProperty("success", true);
        expect(companyData.body.data).toHaveProperty("id");
        companyId = companyData.body.data.id;
    }, 20000);

    it("should update a company", async () => {
        const updatedCompany = {
            name: "Updated Test Company",
        };

        const response = await request(BASE_URL)
            .put(`/api/companies/${companyId}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updatedCompany)
            .expect(200);

        expect(response.body).toHaveProperty("success", true);
    });
});

describe("Company Users with superAdmin token", () => {
    it("should create a new company user POST /api/companies/:companyId/users", async () => {
        const newUser = {
            firstname: "Premium",
            lastname: "Doe",
            email: "systemuser@gmail.com",
            companyId,
            role: "companyadmin",
        };
        const response = await request(BASE_URL)
            .post(`/api/companies/${companyId}/users`)
            .set("Authorization", `Bearer ${token}`)
            .send(newUser)
            .expect(200);

        expect(response.body).toHaveProperty("success", true);
        expect(response.body.data.user).toHaveProperty("id");
        userId = response.body.data.user.id;
    }, 20000);

    it("should get a company by ID", async () => {
        const response = await request(BASE_URL)
            .get(`/api/companies/${companyId}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty("success", true);
    });

    it("should update a company user /api/companies/:companyId/users/:userId", async () => {
        const updatedUser = {
            firstname: "Jane",
            lastname: "Smith",
            email: "PremiufmGandhi@example.com",
        };

        const response = await request(BASE_URL)
            .put(`/api/companies/${companyId}/users/${userId}`)
            .set("Authorization", `Bearer ${token}`)
            .send(updatedUser)
            .expect(200);

        expect(response.body).toHaveProperty("success", true);
    });

    it("should delete a company user DELETE /api/companies/:companyId/users/:userId", async () => {
        const response = await request(BASE_URL)
            .delete(`/api/companies/${companyId}/users/${userId}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty("success", true);
    });

    it("should delete a company", async () => {
        const response = await request(BASE_URL)
            .delete(`/api/companies/${companyId}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty("success", true);
    }, 20000);
});

describe("Company Users with companyAdmin token", () => {
    beforeAll(async () => {
       

        const res = await request(BASE_URL)
            .post("/api/auth/login")
            .send(companyLoginData)
            .expect(200);

        expect(res.body).toHaveProperty("success", true);

        companyToken = res.body.data.token;
        companyIdAdmin = res.body.data.user.companyId;
    });

    it("should create a new company user POST /api/companies/:companyId/users with companyAdmin token", async () => {
        const newUser = {
            firstname: "Premium",
            lastname: "Doe",
            email: "companyuser@gmail.com",
            companyIdAdmin,
            role: "user",
        };
        const response = await request(BASE_URL)
            .post(`/api/companies/${companyIdAdmin}/users`)
            .set("Authorization", `Bearer ${companyToken}`)
            .send(newUser)
            .expect(200);

        expect(response.body).toHaveProperty("success", true);
        expect(response.body.data.user).toHaveProperty("id");
        // userIdComapnyAdmin = response.body.data.user.id;
        UserIdCompany = response.body.data.user.id;
    }, 20000);

    it("should get a company by ID", async () => {
        const response = await request(BASE_URL)
            .get(`/api/companies/${companyIdAdmin}`)
            .set("Authorization", `Bearer ${companyToken}`)
            .expect(200);

        expect(response.body).toHaveProperty("success", true);
    });

    it("should update a company user /api/companies/:companyId/users/:userId", async () => {
        const updatedUser = {
            firstname: "Jane",
            lastname: "Smith",
            email: "JaneSmith@example.com",
        };

        const response = await request(BASE_URL)
            .put(`/api/companies/${companyIdAdmin}/users/${UserIdCompany}`)
            .set("Authorization", `Bearer ${companyToken}`)
            .send(updatedUser)
            .expect(200);

        expect(response.body).toHaveProperty("success", true);
    });

    it("should delete a company user DELETE /api/companies/:companyId/users/:userId", async () => {
        const response = await request(BASE_URL)
            .delete(`/api/companies/${companyIdAdmin}/users/${UserIdCompany}`)
            .set("Authorization", `Bearer ${companyToken}`)
            .expect(200);

        expect(response.body).toHaveProperty("success", true);
    });
});

describe("Invalid Token", () => {
    const invalidToken = "invalid_token";

    it("should return an error when trying to get a company with an invalid token", async () => {
        const response = await request(BASE_URL)
            .get(`/api/companies/${companyId}`)
            .set("Authorization", `Bearer ${invalidToken}`)
            .expect(401);

        expect(response.body).toHaveProperty("success", false);
    });

    it("should return an error when trying to post a new company user with an invalid token", async () => {
        const newUser = {
            firstname: "John",
            lastname: "Doe",
            email: "johndore@example.com",
            companyId,
            role: "user",
        };

        const response = await request(BASE_URL)
            .post(`/api/companies/${companyId}/users`)
            .set("Authorization", `Bearer ${invalidToken}`)
            .send(newUser)
            .expect(401);

        expect(response.body).toHaveProperty("success", false);
    });

    it("should return an error when trying to update a company user with an invalid token", async () => {
        const updatedUser = {
            firstname: "Jane",
            lastname: "Smith",
            email: "janesmhith@example.com",
        };

        const response = await request(BASE_URL)
            .put(`/api/companies/${companyId}/users/${userId}`)
            .set("Authorization", `Bearer ${invalidToken}`)
            .send(updatedUser)
            .expect(401);

        expect(response.body).toHaveProperty("success", false);
    });

    it("should return an error when trying to delete a company user with an invalid token", async () => {
        const response = await request(BASE_URL)
            .delete(`/api/companies/${companyId}/users/${userId}`)
            .set("Authorization", `Bearer ${invalidToken}`)
            .expect(401);

        expect(response.body).toHaveProperty("success", false);
    });
});

describe("Example test", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    });
});
