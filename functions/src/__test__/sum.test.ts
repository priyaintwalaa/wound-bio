import request from "supertest";
const BASE_URL = "http://127.0.0.1:5001/fir-functions-9c002/us-central1/wb";
import { TEST_CONSTANT } from "../constants/test_case.js";
export let SAdminToken:string ;
export let CToken:string;
export let CIdAdmin:string;
describe("Example test", () => {
    beforeAll(async () => {
        const loginData = {
            email: TEST_CONSTANT.USER.LOGIN_SYSTEMADMIN.EMAIL,
            password: TEST_CONSTANT.USER.LOGIN_SYSTEMADMIN.PASSWORD,
        };

        const res = await request(BASE_URL)
            .post("/api/auth/login")
            .send(loginData)
            .expect(200);

        expect(res.body).toHaveProperty("success", true);
        SAdminToken = res.body.data.token;

        const companyLoginData = {
            email: TEST_CONSTANT.COMPANY.LOGIN_COMPANY_ADMIN.EMAIL,
            password: TEST_CONSTANT.COMPANY.LOGIN_COMPANY_ADMIN.PASSWORD,
        };
        const response = await request(BASE_URL)
            .post("/api/auth/login")
            .send(companyLoginData)
            .expect(200);

        expect(response.body).toHaveProperty("success", true);
        CToken = res.body.data.token;
        CIdAdmin = res.body.data.user.companyId;

    });
    it("should pass", () => {
        expect(true).toBe(true);
    });
});