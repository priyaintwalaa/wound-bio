import request from "supertest";
// import { SuperAdminToken as UserToken } from "./users.test.js";
// import { token as UserToken } from "./company.test.js";
// import { patientId as IdPatient } from "./patients.test.js";
const BASE_URL = "http://127.0.0.1:5001/fir-functions-9c002/us-central1/wb";

let orderId: string;
let UserToken:string;
// describe("Order API", () => {
//     beforeAll(async () => {
//         const loginData = {
//             email: "hello@bacancy.com",
//             password: "0353ae0fa3",
//         };

//         const res = await request(BASE_URL)
//             .post("/api/auth/login")
//             .send(loginData)
//             .expect(200);

//         expect(res.body).toHaveProperty("success", true);
//         UserToken = res.body.data.token;
//         // userIdSuperAdmin = res.body.data.user.id;
//     });
//     it("should create order", async () => {
//         const orderName = {
//             name: "Order 1",
//             patientId: IdPatient,
//             orderDate: Date.now(),
//         };
//         const orderData = await request(BASE_URL)
//             .post("/api/orders")
//             .set("Authorization", `Bearer ${UserToken}`)
//             .send(orderName)
//             .expect(200);

//         expect(orderData.body).toHaveProperty("success", true);
//         expect(orderData.body.data).toHaveProperty("id");
//         orderId = orderData.body.data.id;
//     });

//     // it("should get order", async () => {
//     //     const orderData = await request(BASE_URL)
//     //         .get("/api/orders")
//     //         .set("Authorization", `Bearer ${UserToken}`)
//     //         .expect(200);

//     //     expect(orderData.body).toHaveProperty("success", true);
//     // });

//     it("should get order by id", async () => {
//         const orderData = await request(BASE_URL)
//             .get(`/api/orders/${orderId}`)
//             .set("Authorization", `Bearer ${UserToken}`)
//             .expect(200);

//         expect(orderData.body).toHaveProperty("success", true);
//     });

//     it("should get order by id", async () => {
//         const orderName = {
//             name: "Order Updated",
//         };
//         const orderData = await request(BASE_URL)
//             .put(`/api/orders/${orderId}`)
//             .set("Authorization", `Bearer ${UserToken}`)
//             .send(orderName)
//             .expect(200);

//         expect(orderData.body).toHaveProperty("success", true);
//     });

//     it("should delete order by id", async () => {
//         const orderData = await request(BASE_URL)
//             .delete(`/api/orders/${orderId}`)
//             .set("Authorization", `Bearer ${UserToken}`)
//             .expect(200);

//         expect(orderData.body).toHaveProperty("success", true);
//     });
// });

describe("Example test", () => {
    it("should pass", () => {
        expect(true).toBe(true);
    });
});
