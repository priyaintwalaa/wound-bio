import request from "supertest";

const BASE_URL = "http://127.0.0.1:5001/fir-functions-9c002/us-central1/wb";
import { TEST_CONSTANT } from "./test_case.js";
//
// import { SAdminToken as authToken } from "./sum.test.js";
// import { CIdAdmin as companyIdAdmin } from "./sum.test.js";
// import { CToken as companyToken } from "./sum.test.js";
import { loginUser } from "./getToken.js";
export let patientId: string;
let CompaniesId: string;
let authToken: string;
let companyIdAdmin: string;
let companyToken: string;

describe("Patient Routes", () => {
    beforeAll(async () => {
        const res = await loginUser(
            TEST_CONSTANT.USER.LOGIN_SYSTEMADMIN.EMAIL,
            TEST_CONSTANT.USER.LOGIN_SYSTEMADMIN.PASSWORD
        );
        authToken = res.token;

        const response = await loginUser(
            TEST_CONSTANT.COMPANY.LOGIN_COMPANY_ADMIN.EMAIL,
            TEST_CONSTANT.COMPANY.LOGIN_COMPANY_ADMIN.PASSWORD
        );

        companyToken = response.token;
        companyIdAdmin = response.user.companyId;

        const companyName = {
            name: TEST_CONSTANT.COMPANY.CREATE_COMPANY.NAME,
        };

        const companyData = await request(BASE_URL)
            .post("/api/companies")
            .set("Authorization", `Bearer ${authToken}`)
            .send(companyName)
            .expect(200);

        expect(companyData.body).toHaveProperty("success", true);
        expect(companyData.body.data).toHaveProperty("id");
        CompaniesId = companyData.body.data.id;
    });
    it("should create a new patient and store the patientID", async () => {
        const newPatient = {
            name: TEST_CONSTANT.PATIENT.CREATE_NEW_PATIENT.NAME,
            age: TEST_CONSTANT.PATIENT.CREATE_NEW_PATIENT.AGE,
            companyId: CompaniesId,
        };

        const response = await request(BASE_URL)
            .post("/api/patients")
            .set("Authorization", `Bearer ${authToken}`)
            .send(newPatient)
            .expect(200);

        expect(response.body.success).toBe(true);
        patientId = response.body.data.id;
    }, 20000);

    it("should get the patient by patientID", async () => {
        const response = await request(BASE_URL)
            .get(`/api/patients/${patientId}`)
            .set("Authorization", `Bearer ${authToken}`)
            .expect(200);

        expect(response.body.success).toBe(true);
    });

    it("should get all patient of particular company by companyId", async () => {
        const response = await request(BASE_URL)
            .get(`/api/patients?companyId=${CompaniesId}`)
            .set("Authorization", `Bearer ${authToken}`)
            .expect(200);

        expect(response.body.success).toBe(true);
    });

    it("should update the patient by patientID", async () => {
        const updatedPatient = {
            name: TEST_CONSTANT.PATIENT.CREATE_NEW_PATIENT.NAME,
            age: TEST_CONSTANT.PATIENT.CREATE_NEW_PATIENT.AGE,
            companyId: CompaniesId,
        };

        const response = await request(BASE_URL)
            .put(`/api/patients/${patientId}`)
            .set("Authorization", `Bearer ${authToken}`)
            .send(updatedPatient)
            .expect(200);

        expect(response.body.success).toBe(true);
    });

    it("should delete the patient by patient ID", async () => {
        const response = await request(BASE_URL)
            .delete(`/api/patients/${patientId}`)
            .set("Authorization", `Bearer ${authToken}`)
            .expect(200);

        expect(response.body.success).toBe(true);
    });
});

describe("Patient Routes by company Owner", () => {
    it("should create a new patient and store the patientID", async () => {
        const newPatient = {
            name: TEST_CONSTANT.PATIENT.CREATE_NEW_PATIENT.NAME,
            age: TEST_CONSTANT.PATIENT.CREATE_NEW_PATIENT.AGE,
            companyId: companyIdAdmin,
        };

        const response = await request(BASE_URL)
            .post("/api/patients")
            .set("Authorization", `Bearer ${companyToken}`)
            .send(newPatient)
            .expect(200);

        expect(response.body.success).toBe(true);
        patientId = response.body.data.id;
    }, 20000);

    it("should get the patient by  patientID", async () => {
        const response = await request(BASE_URL)
            .get(`/api/patients/${patientId}`)
            .set("Authorization", `Bearer ${companyToken}`)
            .expect(200);

        expect(response.body.success).toBe(true);
    });

    it("should get all the patient of particular company", async () => {
        const response = await request(BASE_URL)
            .get(`/api/patients?companyId=${companyIdAdmin}`)
            .set("Authorization", `Bearer ${companyToken}`)
            .expect(200);

        expect(response.body.success).toBe(true);
    });

    it("should update the patient by patientID", async () => {
        const updatedPatient = {
            name: TEST_CONSTANT.PATIENT.UPDATE_PATIENT.NAME,
            age: TEST_CONSTANT.PATIENT.UPDATE_PATIENT.AGE,
            companyId: companyIdAdmin,
        };

        const response = await request(BASE_URL)
            .put(`/api/patients/${patientId}`)
            .set("Authorization", `Bearer ${companyToken}`)
            .send(updatedPatient)
            .expect(200);

        expect(response.body.success).toBe(true);
    });

    it("should delete the patient by patientID", async () => {
        const response = await request(BASE_URL)
            .delete(`/api/patients/${patientId}`)
            .set("Authorization", `Bearer ${companyToken}`)
            .expect(200);

        expect(response.body.success).toBe(true);
    });
});
