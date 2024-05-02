import request from "supertest";
import { TEST_CONSTANT } from "../constants/test_case.js";
const BASE_URL = "http://127.0.0.1:5001/fir-functions-9c002/us-central1/wb";
import { SAdminToken as UserToken } from "./sum.test.js";

let manufacturerId: string;
let productId: string;
describe("Manufacturer and Product Routes", () => {
    it("it should create a new manufacturer", async () => {
        const manufacturer = {
            name: TEST_CONSTANT.MANUFACTURE.CREATE_NEW_MANUFACTURE.NAME,
        };
        const manufacturerCreate = await request(BASE_URL)
            .post("/api/manufacturers")
            .set("Authorization", `Bearer ${UserToken}`)
            .send(manufacturer)
            .expect(200);

        expect(manufacturerCreate.body).toHaveProperty("success", true);
        expect(manufacturerCreate.body.data).toHaveProperty("id");
        manufacturerId = manufacturerCreate.body.data.id;
    });

    it("update the manufacturer", async () => {
        const manufacturer = {
            name: TEST_CONSTANT.MANUFACTURE.UPDATE_MANUFACTURE.NAME,
        };
        const manufacturerUpdate = await request(BASE_URL)
            .put(`/api/manufacturers/${manufacturerId}`)
            .set("Authorization", `Bearer ${UserToken}`)
            .send(manufacturer)
            .expect(200);

        expect(manufacturerUpdate.body).toHaveProperty("success", true);
    });
});

describe("Product Routes", () => {
    it("it should create product of the manufacturer", async () => {
        const productData = { name: TEST_CONSTANT.PRODUCT.CREATE_PRODUCT.NAME };

        const productCreate = await request(BASE_URL)
            .post(`/api/manufacturers/${manufacturerId}/product`)
            .set("Authorization", `Bearer ${UserToken}`)
            .send(productData)
            .expect(200);

        expect(productCreate.body).toHaveProperty("success", true);
        expect(productCreate.body.data).toHaveProperty("id");
        productId = productCreate.body.data.id;
    });

    it("it should update the product", async () => {
        const productData = { name: TEST_CONSTANT.PRODUCT.UPDATE_PRODUCT.NAME };

        const productCreate = await request(BASE_URL)
            .put(`/api/manufacturers/${manufacturerId}/product/${productId}`)
            .set("Authorization", `Bearer ${UserToken}`)
            .send(productData)
            .expect(200);

        expect(productCreate.body).toHaveProperty("success", true);
    });
    it("it should delete the product", async () => {
        const productDelete = await request(BASE_URL)
            .delete(`/api/manufacturers/${manufacturerId}/product/${productId}`)
            .set("Authorization", `Bearer ${UserToken}`)
            .expect(200);

        expect(productDelete.body).toHaveProperty("success", true);
    });
    it("it should delete the manufacturer", async () => {
        const manufacturerDelete = await request(BASE_URL)
            .delete(`/api/manufacturers/${manufacturerId}`)
            .set("Authorization", `Bearer ${UserToken}`)
            .expect(200);

        expect(manufacturerDelete.body).toHaveProperty("success", true);
    });
});