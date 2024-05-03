import request from "supertest";
import { TEST_CONSTANT } from "./test_case.js";
const BASE_URL = TEST_CONSTANT.BASE_URL;

import { loginUser } from "./getToken.js";

export let companyId: string;
let token: string;
let userId: string;
let companyToken: string;
let companyIdAdmin: string;
let UserIdCompany: string;
let OthercompanyId: string;

describe("Company API Test Case", () => {
    beforeAll(async () => {
        const res = await loginUser(
            TEST_CONSTANT.USER.LOGIN_SYSTEMADMIN.EMAIL,
            TEST_CONSTANT.USER.LOGIN_SYSTEMADMIN.PASSWORD
        );
        token = res.token;
    });
    it("return token for a valid user and create company", async () => {
        const companyName = {
            name: TEST_CONSTANT.COMPANY.CREATE_COMPANY.NAME,
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

describe("Company Users accessible to stakeholders", () => {
    it("should create a new company user", async () => {
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

    it("should get a company detials by ID", async () => {
        const response = await request(BASE_URL)
            .get(`/api/companies/${companyId}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(200);

        expect(response.body).toHaveProperty("success", true);
    });

    it("should update a company user", async () => {
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

    it("should delete a company user", async () => {
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

describe("Company Users accessible to company Owner", () => {
    beforeAll(async()=>{
        const res = await loginUser(
            TEST_CONSTANT.COMPANY.LOGIN_COMPANY_ADMIN.EMAIL,
            TEST_CONSTANT.COMPANY.LOGIN_COMPANY_ADMIN.PASSWORD
        );
        companyToken = res.token;
        companyIdAdmin = res.user.companyId;
    });

    it("should create a new company user", async () => {
        const newUser = {
            firstname: TEST_CONSTANT.COMPANY.CREATE_COMPANY_USER.FIRSTNAME,
            lastname: TEST_CONSTANT.COMPANY.CREATE_COMPANY_USER.LASTNAME,
            email: TEST_CONSTANT.COMPANY.CREATE_COMPANY_USER.EMAIL,
            companyId: companyIdAdmin,
            role: TEST_CONSTANT.COMPANY.CREATE_COMPANY_USER.ROLE,
        };
        const response = await request(BASE_URL)
            .post(`/api/companies/${companyIdAdmin}/users`)
            .set("Authorization", `Bearer ${companyToken}`)
            .send(newUser)
            .expect(200);

        expect(response.body).toHaveProperty("success", true);
        expect(response.body.data.user).toHaveProperty("id");
        UserIdCompany = response.body.data.user.id;
    }, 20000);

    it("should get a company details by ID", async () => {
        const response = await request(BASE_URL)
            .get(`/api/companies/${companyIdAdmin}`)
            .set("Authorization", `Bearer ${companyToken}`)
            .expect(200);

        expect(response.body).toHaveProperty("success", true);
    });

    it("should update a company user", async () => {
        const updatedUser = {
            firstname: TEST_CONSTANT.COMPANY.UPDATE_COMPANY_USER.FIRSTNAME,
            lastname: TEST_CONSTANT.COMPANY.UPDATE_COMPANY_USER.LASTNAME,
            email: TEST_CONSTANT.COMPANY.UPDATE_COMPANY_USER.EMAIL,
            companyId: companyIdAdmin,
            role: TEST_CONSTANT.COMPANY.UPDATE_COMPANY_USER.ROLE,
        };

        const response = await request(BASE_URL)
            .put(`/api/companies/${companyIdAdmin}/users/${UserIdCompany}`)
            .set("Authorization", `Bearer ${companyToken}`)
            .send(updatedUser)
            .expect(200);

        expect(response.body).toHaveProperty("success", true);
    });

    it("should delete a company user", async () => {
        const response = await request(BASE_URL)
            .delete(`/api/companies/${companyIdAdmin}/users/${UserIdCompany}`)
            .set("Authorization", `Bearer ${companyToken}`)
            .expect(200);

        expect(response.body).toHaveProperty("success", true);
    });
});

describe("Authorised to company owners", () => {
    it("should not create company by company owner", async () => {
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

    it("should not update a companyby company owner", async () => {
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

    it("should not delete a company by company owner", async () => {
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
    it("should not get company details of other company", async () => {
        const response = await request(BASE_URL)
            .get(`/api/companies/${OthercompanyId}`)
            .set("Authorization", `Bearer ${companyToken}`)
            .expect(401);

        expect(response.body).toHaveProperty("success", false);
    });

    it("should not create a new company user in another company", async () => {
        const newUser = {
            firstname: TEST_CONSTANT.COMPANY.SECOND_COMPANY_USER.FIRSTNAME,
            lastname: TEST_CONSTANT.COMPANY.SECOND_COMPANY_USER.LASTNAME,
            email: TEST_CONSTANT.COMPANY.SECOND_COMPANY_USER.EMAIL,
            companyId: OthercompanyId,
            role: TEST_CONSTANT.COMPANY.SECOND_COMPANY_USER.ROLE,
        };
        const response = await request(BASE_URL)
            .post(`/api/companies/${OthercompanyId}/users`)
            .set("Authorization", `Bearer ${companyToken}`)
            .send(newUser)
            .expect(401);

        expect(response.body).toHaveProperty("success", false);
    }, 20000);

    it("should not update a FIRST company user with SECOND COMPANY owner", async () => {
        const updatedUser = {
            firstname: TEST_CONSTANT.COMPANY.SECOND_COMPANY_USER.FIRSTNAME,
            lastname: TEST_CONSTANT.COMPANY.SECOND_COMPANY_USER.LASTNAME,
            email: TEST_CONSTANT.COMPANY.SECOND_COMPANY_USER.EMAIL,
        };

        const response = await request(BASE_URL)
            .put(`/api/companies/${OthercompanyId}/users/${UserIdCompany}`)
            .set("Authorization", `Bearer ${companyToken}`)
            .send(updatedUser)
            .expect(401);

        expect(response.body).toHaveProperty("success", false);
    });

    it("should not delete a company user of another company ", async () => {
        const response = await request(BASE_URL)
            .delete(`/api/companies/${OthercompanyId}/users/${UserIdCompany}`)
            .set("Authorization", `Bearer ${companyToken}`)
            .expect(401);

        expect(response.body).toHaveProperty("success", false);
    });
});
