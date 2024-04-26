import request from 'supertest';
// import { token as UserToken } from './company.test.js'
const BASE_URL = 'http://127.0.0.1:5001/fir-functions-9c002/us-central1/wb';

let orderId: string
// describe('Order API', () => {
//     it('should create order', async () => {

//         const orderName = {
//             name: 'Order 1'
//         }
//         const orderData = await request(BASE_URL)
//             .post('/api/orders')
//             .set('Authorization', `Bearer ${UserToken}`)
//             .send(orderName)
//             .expect(200)

//         expect(orderData.body).toHaveProperty('success', true)
//         expect(orderData.body.data).toHaveProperty('id')
//         orderId = orderData.body.data.id
//     })

//     it('should get order', async () => {
//         const orderData = await request(BASE_URL)
//             .post('/api/orders')
//             .set('Authorization', `Bearer ${UserToken}`)
//             .expect(200)

//         expect(orderData.body).toHaveProperty('success', true)

//     })

//     it('should get order by id', async () => {

//         const orderData = await request(BASE_URL)
//             .post(`/api/orders/${orderId}`)
//             .set('Authorization', `Bearer ${UserToken}`)
//             .expect(200)

//         expect(orderData.body).toHaveProperty('success', true)
//     })
// })

describe('Example test', () => {
    it('should pass', () => {
      expect(true).toBe(true);
    });
  });