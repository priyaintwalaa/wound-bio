import request from "supertest";
const BASE_URL = "http://127.0.0.1:5001/fir-functions-9c002/us-central1/wb";
import { TEST_CONSTANT } from "../constants/test_case.js";

// import { SAdminToken as token } from "./sum.test.js";
// import { CIdAdmin as companyIdAdmin } from "./sum.test.js";
// import { CToken as companyToken } from "./sum.test.js";

export let companyId: string;
export let token: string;
let userId: string;
let companyToken: string;
let companyIdAdmin: string;
let UserIdCompany: string;
let OthercompanyId: string;

const loginData = {
    email: TEST_CONSTANT.USER.LOGIN_SYSTEMADMIN.EMAIL,
    password: TEST_CONSTANT.USER.LOGIN_SYSTEMADMIN.PASSWORD,
};
const companyLoginData = {
    email: TEST_CONSTANT.COMPANY.LOGIN_COMPANY_ADMIN.EMAIL,
    password: TEST_CONSTANT.COMPANY.LOGIN_COMPANY_ADMIN.PASSWORD,
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
            name:TEST_CONSTANT.COMPANY.CREATE_COMPANY.NAME
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
            name: TEST_CONSTANT.COMPANY.UPDATE_COMPANY.NAME,
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
            firstname: TEST_CONSTANT.COMPANY.CREATE_COMPANY_ADMIN.FIRSTNAME,
            lastname: TEST_CONSTANT.COMPANY.CREATE_COMPANY_ADMIN.LASTNAME,
            email: TEST_CONSTANT.COMPANY.CREATE_COMPANY_ADMIN.EMAIL,
            companyId,
            role: TEST_CONSTANT.COMPANY.CREATE_COMPANY_ADMIN.ROLE,
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
            firstname: TEST_CONSTANT.COMPANY.UPDATE_COMPANY_ADMIN.FIRSTNAME,
            lastname: TEST_CONSTANT.COMPANY.UPDATE_COMPANY_ADMIN.LASTNAME,
            email: TEST_CONSTANT.COMPANY.UPDATE_COMPANY_ADMIN.EMAIL,
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
            firstname: TEST_CONSTANT.COMPANY.CREATE_COMPANY_USER.FIRSTNAME,
            lastname: TEST_CONSTANT.COMPANY.CREATE_COMPANY_USER.LASTNAME,
            email: TEST_CONSTANT.COMPANY.CREATE_COMPANY_USER.EMAIL,
            companyId:companyIdAdmin,
            role: TEST_CONSTANT.COMPANY.CREATE_COMPANY_USER.ROLE,
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
            firstname: TEST_CONSTANT.COMPANY.UPDATE_COMPANY_USER.FIRSTNAME,
            lastname: TEST_CONSTANT.COMPANY.UPDATE_COMPANY_USER.LASTNAME,
            email: TEST_CONSTANT.COMPANY.UPDATE_COMPANY_USER.EMAIL,
            companyId:companyIdAdmin,
            role: TEST_CONSTANT.COMPANY.UPDATE_COMPANY_USER.ROLE,
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

describe("Authorised to companyAdmin owners", () => {
    it("cannot create company with companyAdmin token", async () => {
        const companyName = {
            name: TEST_CONSTANT.COMPANY.CREATE_COMPANY.NAME,
        };
        const companyData = await request(BASE_URL)
            .post("/api/companies")
            .set("Authorization", `Bearer ${companyToken}`)
            .send(companyName)
            .expect(401);
        expect(companyData.body).toHaveProperty("success", false);
    });

    it("cannot update a company with companyAdmin", async () => {
        const updatedCompany = {
            name: TEST_CONSTANT.COMPANY.UPDATE_COMPANY.NAME,
        };
        const response = await request(BASE_URL)
            .put(`/api/companies/${companyIdAdmin}`)
            .set("Authorization", `Bearer ${companyToken}`)
            .send(updatedCompany)
            .expect(401);

        expect(response.body).toHaveProperty("success", false);
    });

    it("cannot delete a company with companyAdmin Token", async () => {
        const response = await request(BASE_URL)
            .delete(`/api/companies/${companyIdAdmin}`)
            .set("Authorization", `Bearer ${companyToken}`)
            .expect(401);

        expect(response.body).toHaveProperty("success", false);
    }, 20000);

    it("create other company", async () => {
        const companyName = {
            name: TEST_CONSTANT.COMPANY.SECOND_COMPANY.NAME,
        };

        const companyData = await request(BASE_URL)
            .post("/api/companies")
            .set("Authorization", `Bearer ${token}`)
            .send(companyName)
            .expect(200);

        expect(companyData.body).toHaveProperty("success", true);
        expect(companyData.body.data).toHaveProperty("id");
        OthercompanyId = companyData.body.data.id;
    });
    it("cannot get company details of other company", async () => {
        const response = await request(BASE_URL)
            .get(`/api/companies/${OthercompanyId}`)
            .set("Authorization", `Bearer ${companyToken}`)
            .expect(401);

        expect(response.body).toHaveProperty("success", false);
    });

    it("cannot create a new company user in another company", async () => {
        const newUser = {
            firstname: TEST_CONSTANT.COMPANY.SECOND_COMPANY_USER.FIRSTNAME,
            lastname:  TEST_CONSTANT.COMPANY.SECOND_COMPANY_USER.LASTNAME,
            email:  TEST_CONSTANT.COMPANY.SECOND_COMPANY_USER.EMAIL,
            companyId:OthercompanyId,
            role:  TEST_CONSTANT.COMPANY.SECOND_COMPANY_USER.ROLE,
        };
        const response = await request(BASE_URL)
            .post(`/api/companies/${OthercompanyId}/users`)
            .set("Authorization", `Bearer ${companyToken}`)
            .send(newUser)
            .expect(401);

        expect(response.body).toHaveProperty("success", false);
    }, 20000);

    it("cannot update a FIRST company user with SECOND COMPANY CREDENTIAL", async () => {
        const updatedUser = {
            firstname: TEST_CONSTANT.COMPANY.SECOND_COMPANY_USER.FIRSTNAME,
            lastname:  TEST_CONSTANT.COMPANY.SECOND_COMPANY_USER.LASTNAME,
            email:  TEST_CONSTANT.COMPANY.SECOND_COMPANY_USER.EMAIL,
        };

        const response = await request(BASE_URL)
            .put(`/api/companies/${OthercompanyId}/users/${UserIdCompany}`)
            .set("Authorization", `Bearer ${companyToken}`)
            .send(updatedUser)
            .expect(401);

        expect(response.body).toHaveProperty("success", false);
    });

    it("cannot delete a company user of another company ", async () => {
        const response = await request(BASE_URL)
            .delete(`/api/companies/${OthercompanyId}/users/${UserIdCompany}`)
            .set("Authorization", `Bearer ${companyToken}`)
            .expect(401);

        expect(response.body).toHaveProperty("success", false);
    });
});
