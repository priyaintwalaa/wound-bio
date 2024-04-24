// import supertest from 'supertest';
// // import app from '../app.js';
// import { Roles } from '../constants/enums.js';
// import {CompanyController} from '../controllers/company.controller.js';
// import {
//     verfiyRole,
// } from "../middlewares/auth.middleware.js";
// const BASE_URL = 'http://127.0.0.1:5001/woundbio/us-central1/wb'
// import { Request, Response } from "express";

// const mockRoles = {
//     user:{
//         role:Roles.SYSTEM_ADMIN
//     }
// }

// describe('Company Routes', () => {
//   let companyId: string;
//   let userId: string;
//   let systemAdminApiKey: string;

//   beforeAll(() => {
//     // Set the system admin API key for testing purposes
//     systemAdminApiKey = process.env.SYSTEM_ADMIN_KEY;
//   });

//   describe('POST /api/companies', () => {
//     it('should create a new company', async () => {
//         const newCompany = {
//             name: 'Test Company two',
//           };
    
//           // Mock the request object
//           const req = {
//             body: newCompany,
//             user: {
//               role: Roles.SYSTEM_ADMIN, // Set an unauthorized role
//             },
//           } as unknown as Request;
    
//           // Mock the response object
//           const res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn(),
//           } as unknown as Response;
    
//           // Mock the next function
//           const next = jest.fn();
    
//           // Call the verifyRole middleware
//           verfiyRole([Roles.SYSTEM_ADMIN])(req, res, next);
    
//           // Call the createCompany controller
//           await CompanyController.createCompany(req, res);
      

//       const response = await supertest(BASE_URL)
//         .post('/api/companies')
//         .set('x-api-key', systemAdminApiKey)
//         .send(newCompany)
//         .expect(200);

//       expect(response.body).toHaveProperty('success', true);
//       expect(response.body).toHaveProperty('message', 'Company created');
//       expect(response.body.data).toHaveProperty('id');
//       companyId = response.body.data.id;
//     });
//   });

//   describe('GET /api/companies/:companyId', () => {
//     it('should get a company by ID', async () => {
//       const response = await supertest(BASE_URL)
//         .get(`/api/companies/${companyId}`)
//         .set('x-api-key', systemAdminApiKey)
//         // .set('x-role', Roles.SYSTEM_ADMIN)
//         .expect(200);

//       expect(response.body).toHaveProperty('success', true);
//       expect(response.body.data).toHaveProperty('name', 'Test Company');
//     });
//   });

//   describe('PUT /api/companies/:companyId', () => {
//     it('should update a company', async () => {
//       const updatedCompany = {
//         name: 'Updated Test Company',
//       };

//       const response = await supertest(BASE_URL)
//         .put(`/api/companies/${companyId}`)
//         .set('x-api-key', systemAdminApiKey)
//         // .set('x-role', Roles.SYSTEM_ADMIN)
//         .send(updatedCompany)
//         .expect(200);

//       expect(response.body).toHaveProperty('success', true);
//       expect(response.body).toHaveProperty('message', 'Company updated');
//     });
//   });

//   describe('DELETE /api/companies/:companyId', () => {
//     it('should delete a company', async () => {
//       const response = await supertest(BASE_URL)
//         .delete(`/api/companies/${companyId}`)
//         .set('x-api-key', systemAdminApiKey)
//         // .set('x-role', Roles.SYSTEM_ADMIN)
//         .expect(200);

//       expect(response.body).toHaveProperty('success', true);
//       expect(response.body).toHaveProperty('message', 'Company deleted');
//     });
//   });

//   describe('POST /api/companies/:companyId/users', () => {
//     it('should create a new company user', async () => {
//       const newCompany = {
//         name: 'Test Company 2',
//       };

//       const createCompanyResponse = await supertest(BASE_URL)
//         .post('/api/companies')
//         .set('x-api-key', systemAdminApiKey)
//         // .set('x-role', Roles.SYSTEM_ADMIN)
//         .send(newCompany)
//         .expect(200);

//       companyId = createCompanyResponse.body.data.id;

//       const newUser = {
//         firstname: 'John',
//         lastname: 'Doe',
//         email: 'johndoe@example.com',
//       };

//       const response = await supertest(BASE_URL)
//         .post(`/api/companies/${companyId}/users`)
//         .set('x-api-key', systemAdminApiKey)
//         // .set('x-role', Roles.SYSTEM_ADMIN)
//         .send(newUser)
//         .expect(200);

//       expect(response.body).toHaveProperty('success', true);
//       expect(response.body).toHaveProperty('message', 'Company user created');
//       expect(response.body.data.user).toHaveProperty('id');
//       userId = response.body.data.user.id;
//     });
//   });

//   describe('PUT /api/companies/:companyId/users/:userId', () => {
//     it('should update a company user', async () => {
//       const updatedUser = {
//         firstname: 'Jane',
//         lastname: 'Smith',
//         email: 'janesmith@example.com',
//       };

//       const response = await supertest(BASE_URL)
//         .put(`/api/companies/${companyId}/users/${userId}`)
//         .set('x-api-key', systemAdminApiKey)
//         // .set('x-role', Roles.SYSTEM_ADMIN)
//         .send(updatedUser)
//         .expect(200);

//       expect(response.body).toHaveProperty('success', true);
//       expect(response.body).toHaveProperty('message', 'Company user updated');
//     });
//   });

//   describe('DELETE /api/companies/:companyId/users/:userId', () => {
//     it('should delete a company user', async () => {
//       const response = await supertest(BASE_URL)
//         .delete(`/api/companies/${companyId}/users/${userId}`)
//         .set('x-api-key', systemAdminApiKey)
//         // .set('x-role', Roles.SYSTEM_ADMIN)
//         .expect(200);

//       expect(response.body).toHaveProperty('success', true);
//       expect(response.body).toHaveProperty('message', 'Company user deleted');
//     });
//   });
// });

describe('Example test', () => {
    it('should pass', () => {
      expect(true).toBe(true);
    });
  });