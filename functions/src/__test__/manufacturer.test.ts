import request from "supertest";
// import { SuperAdminToken as UserToken } from "./users.test.js";
// import { token as UserToken } from "./company.test.js";

const BASE_URL = "http://127.0.0.1:5001/fir-functions-9c002/us-central1/wb";

let manufacturerId: string;
let productId: string;
let UserToken: string;
describe("Manufacturer and Product Routes", () => {
    beforeAll(async () => {
        const loginData = {
            email: "hello@bacancy.com",
            password: "728b579941",
        };

        const res = await request(BASE_URL)
            .post("/api/auth/login")
            .send(loginData)
            .expect(200);

        expect(res.body).toHaveProperty("success", true);
        UserToken = res.body.data.token;
        // userIdSuperAdmin = res.body.data.user.id;
    });
    it("it should create a new manufacturer", async () => {
        const manufacturerCreate = await request(BASE_URL)
            .post("/api/manufacturers")
            .set("Authorization", `Bearer ${UserToken}`)
            .send({ name: "cettemol" })
            .expect(200);

        expect(manufacturerCreate.body).toHaveProperty("success", true);
        expect(manufacturerCreate.body.data).toHaveProperty("id");
        manufacturerId = manufacturerCreate.body.data.id;
    });

    it("update the manufacturer", async () => {
        const manufacturerUpdate = await request(BASE_URL)
            .put(`/api/manufacturers/${manufacturerId}`)
            .set("Authorization", `Bearer ${UserToken}`)
            .send({ name: "paracettemol" })
            .expect(200);

        expect(manufacturerUpdate.body).toHaveProperty("success", true);
    });

    // it("should return an error when trying to retrieve a non-existent manufacturer", async () => {
    //     const nonExistentManufacturerId = "invalid-manufacturer-id";
    //     const response = await request(BASE_URL)
    //         .put(`/api/manufacturers/${nonExistentManufacturerId}`)
    //         .set("Authorization", `Bearer ${UserToken}`)
    //         .send({ name: "not existing data" })
    //         .expect(401);

    //     expect(response.body).toHaveProperty("success", false);
    //     expect(response.body.error).toBeDefined();
    // });
});

describe("Product Routes", () => {
    it("it should create product of the manufacturer", async () => {
        const productData = { name: "Product Manu" };

        const productCreate = await request(BASE_URL)
            .post(`/api/manufacturers/${manufacturerId}/product`)
            .set("Authorization", `Bearer ${UserToken}`)
            .send(productData)
            .expect(200);

        expect(productCreate.body).toHaveProperty("success", true);
        expect(productCreate.body.data).toHaveProperty("id");
        productId = productCreate.body.data.id;
    });

    // it("should return an error when trying to create a product for a non-existent manufacturer", async () => {
    //     const nonExistentManufacturerId = "invalid-manufacturer-id";
    //     const productData = { name: "Product 1" };
    //     const response = await request(BASE_URL)
    //         .post(`/api/manufacturers/${nonExistentManufacturerId}/product`)
    //         .set("Authorization", `Bearer ${UserToken}`)
    //         .send(productData)
    //         .expect(401);

    //     expect(response.body).toHaveProperty("success", false);
    //     expect(response.body.error).toBeDefined();
    // });

    it("it should update the product", async () => {
        const productData = { name: "Product 1" };

        const productCreate = await request(BASE_URL)
            .put(`/api/manufacturers/${manufacturerId}/product/${productId}`)
            .set("Authorization", `Bearer ${UserToken}`)
            .send(productData)
            .expect(200);

        expect(productCreate.body).toHaveProperty("success", true);
    });

    // it("should return an error when trying to update a non-existent product", async () => {
    //     const nonExistentProductId = "invalid-product-id";
    //     const productData = { name: "Updated Product" };
    //     const response = await request(BASE_URL)
    //         .put(
    //             `/api/manufacturers/${manufacturerId}/product/${nonExistentProductId}`
    //         )
    //         .set("Authorization", `Bearer ${UserToken}`)
    //         .send(productData)
    //         .expect(401);

    //     expect(response.body).toHaveProperty("success", false);
    //     expect(response.body.error).toBeDefined();
    // });

    it("it should delete the product", async () => {
        const productDelete = await request(BASE_URL)
            .delete(`/api/manufacturers/${manufacturerId}/product/${productId}`)
            .set("Authorization", `Bearer ${UserToken}`)
            .expect(200);

        expect(productDelete.body).toHaveProperty("success", true);
    });

    // it("should return an error when trying to delete a non-existent product", async () => {
    //     const nonExistentProductId = "invalid-product-id";
    //     const response = await request(BASE_URL)
    //         .delete(
    //             `/api/manufacturers/${manufacturerId}/product/${nonExistentProductId}`
    //         )
    //         .set("Authorization", `Bearer ${UserToken}`)
    //         .expect(401);

    //     expect(response.body).toHaveProperty("success", false);
    //     expect(response.body.error).toBeDefined();
    // });
    it("it should delete the manufacturer", async () => {
        const manufacturerDelete = await request(BASE_URL)
            .delete(`/api/manufacturers/${manufacturerId}`)
            .set("Authorization", `Bearer ${UserToken}`)
            .expect(200);

        expect(manufacturerDelete.body).toHaveProperty("success", true);
    });
});

describe("Invalid Token",()=>{
    const invalidToken = "invalid-token";
    it("it should create a new manufacturer should response UnAuthorized with invalid token", async () => {
        const manufacturerCreate = await request(BASE_URL)
            .post("/api/manufacturers")
            .set("Authorization", `Bearer ${invalidToken}`)
            .send({ name: "cettemol" })
            .expect(401);

        expect(manufacturerCreate.body).toHaveProperty("success", false);
    });

    it("update the manufacturer should response UnAuthorized with invalid token", async () => {
        const manufacturerUpdate = await request(BASE_URL)
            .put(`/api/manufacturers/${manufacturerId}`)
            .set("Authorization", `Bearer ${invalidToken}`)
            .send({ name: "paracettemol" })
            .expect(401);

        expect(manufacturerUpdate.body).toHaveProperty("success", false);
    });

    it("it should create product of the manufacturer should response UnAuthorized with invalid token", async () => {
        const productData = { name: "Product Manu" };

        const productCreate = await request(BASE_URL)
            .post(`/api/manufacturers/${manufacturerId}/product`)
            .set("Authorization", `Bearer ${invalidToken}`)
            .send(productData)
            .expect(401);

        expect(productCreate.body).toHaveProperty("success", false);
    });

    it("it should update the product should response UnAuthorized with invalid token", async () => {
        const productData = { name: "Product 1" };

        const productCreate = await request(BASE_URL)
            .put(`/api/manufacturers/${manufacturerId}/product/${productId}`)
            .set("Authorization", `Bearer ${invalidToken}`)
            .send(productData)
            .expect(401);

        expect(productCreate.body).toHaveProperty("success", false);
    });

    it("it should delete the product should response UnAuthorized with invalid token", async () => {
        const productDelete = await request(BASE_URL)
            .delete(`/api/manufacturers/${manufacturerId}/product/${productId}`)
            .set("Authorization", `Bearer ${invalidToken}`)
            .expect(401);

        expect(productDelete.body).toHaveProperty("success", false);
    });

    it("it should delete the manufacturer should response UnAuthorized with invalid token", async () => {
        const manufacturerDelete = await request(BASE_URL)
            .delete(`/api/manufacturers/${manufacturerId}`)
            .set("Authorization", `Bearer ${invalidToken}`)
            .expect(401);

        expect(manufacturerDelete.body).toHaveProperty("success", false);
    });
});

describe("Example test", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    });
});
