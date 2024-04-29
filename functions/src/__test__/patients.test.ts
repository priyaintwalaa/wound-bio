import request from "supertest";
// import { SuperAdminToken as authToken } from "./users.test.js";
// import { token as authToken } from "./company.test.js";
const BASE_URL = "http://127.0.0.1:5001/fir-functions-9c002/us-central1/wb";
// import { companyId as CompaniesId } from "./company.test.js";
export let patientId: string;

let authToken: string;
let CompaniesId: string;

describe("Patient Routes", () => {
    beforeAll(async () => {
        const loginData = {
            email: "hello@bacancy.com",
            password: "0353ae0fa3",
        };

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
    it("should create a new patient and store the ID", async () => {
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

    it("should get the patient by stored ID", async () => {
        const response = await request(BASE_URL)
            .get(`/api/patients/${patientId}`)
            .set("Authorization", `Bearer ${authToken}`)
            .expect(200);

        expect(response.body.success).toBe(true);
    });

    it("should get the patient by stored ID", async () => {
        const response = await request(BASE_URL)
            .get(`/api/patients?companyId=${CompaniesId}`)
            .set("Authorization", `Bearer ${authToken}`)
            .expect(200);

        expect(response.body.success).toBe(true);
    });

    it("should update the patient by stored ID", async () => {
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

    it("should delete the patient by stored ID", async () => {
        const response = await request(BASE_URL)
            .delete(`/api/patients/${patientId}`)
            .set("Authorization", `Bearer ${authToken}`)
            .expect(200);

        expect(response.body.success).toBe(true);
    });
});
describe("Example test", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    });
});
