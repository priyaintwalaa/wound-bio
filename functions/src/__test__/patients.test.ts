import request from "supertest";
// import { SuperAdminToken as authToken } from "./users.test.js";
// import { token as authToken } from "./company.test.js";
const BASE_URL = "http://127.0.0.1:5001/fir-functions-9c002/us-central1/wb";
// import { companyId as CompaniesId } from "./company.test.js";
export let patientId: string;

let authToken: string;
let CompaniesId: string;
const loginData = {
    email: "hello@bacancy.com",
    password: "ace08c5120",
};
const companyLoginData = {
    email: "johndowswee@example.com",
    password: "b2bbfe44c3",
};
describe("Patient Routes by systemadmin", () => {
    beforeAll(async () => {
        const res = await request(BASE_URL)
            .post("/api/auth/login")
            .send(loginData)
            .expect(200);

        expect(res.body).toHaveProperty("success", true);
        authToken = res.body.data.token;

        const companyName = {
            name: "Premium",
        };

        const companyData = await request(BASE_URL)
            .post("/api/companies")
            .set("Authorization", `Bearer ${authToken}`)
            .send(companyName)
            .expect(200);

        expect(companyData.body).toHaveProperty("success", true);
        expect(companyData.body.data).toHaveProperty("id");
        CompaniesId = companyData.body.data.id;
        // userIdSuperAdmin = res.body.data.user.id;
    });
    it("should create a new patient and store the patientID", async () => {
        const newPatient = {
            name: "John Great",
            age: 30,
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

    it("should get all patient of particular companyID", async () => {
        const response = await request(BASE_URL)
            .get(`/api/patients?companyId=${CompaniesId}`)
            .set("Authorization", `Bearer ${authToken}`)
            .expect(200);

        expect(response.body.success).toBe(true);
    });

    it("should update the patient by patientID", async () => {
        const updatedPatient = {
            name: "Updated Patient",
            age: 90,
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

let companyToken: string;
let companyIdAdmin: string;
describe("Patient Routes by companyAdmin", () => {
    beforeAll(async () => {
        const res = await request(BASE_URL)
            .post("/api/auth/login")
            .send(companyLoginData)
            .expect(200);

        expect(res.body).toHaveProperty("success", true);
       
        companyToken = res.body.data.token;
        companyIdAdmin = res.body.data.user.companyId;
       
    });
    it("should create a new patient and store the patientID", async () => {
        const newPatient = {
            name: "John Great",
            age: 30,
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
            name: "Updated Patient",
            age: 90,
            companyId: companyIdAdmin,
        };

        const response = await request(BASE_URL)
            .put(`/api/patients/${patientId}`)
            .set("Authorization", `Bearer ${companyToken}`)
            .send(updatedPatient)
            .expect(200);

        expect(response.body.success).toBe(true);
    });

    it("should delete the patient by  patientID", async () => {
        const response = await request(BASE_URL)
            .delete(`/api/patients/${patientId}`)
            .set("Authorization", `Bearer ${companyToken}`)
            .expect(200);

        expect(response.body.success).toBe(true);
    });
});
describe("Example test", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    });
});
