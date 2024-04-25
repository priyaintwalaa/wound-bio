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

// describe('Company Controller', () => {
//     let companyId: string;
//     it('create a new company and check the role ', async () => {
//         const req = { user: { role: 'superadmin' }, body: { name: 'My first test' } }

//         const response =
//             await supertest(BASE_URL).post('/api/companies')
//                 .set('x-api-key', process.env.SYSTEM_ADMIN_KEY)
//                 .send(req)
//                 .expect(200)

//         expect(response.body).toHaveProperty('success', true);
//         expect(response.body.data).toHaveProperty('id');
//         companyId = response.body.data.id;
//     })
// })
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

// describe('Example test', () => {
//     it('should pass', () => {
//         expect(true).toBe(true);
//     });
// });

// import request from 'supertest';
// import  app from '../app.js'; // Assuming your Express app is exported as 'app'
// import { verifyToken, verfiyRole } from '../middlewares/auth.middleware.js'; // Import necessary middleware functions
// import { Roles } from '../constants/enums.js'; // Assuming Roles is defined in a separate file
// import companyService from '../services/comapny.services.js'; // Import the service function for creating a company

// const BASE_URL = 'http://127.0.0.1:5001/fir-functions-9c002/us-central1/wb';

// interface ExtendedExpressRequest {
//   user: {
//     role: string;
//   };
// }

// describe('Company creation endpoint', () => {
//   it('should create a company when authorized and has SYSTEM_ADMIN role', async () => {
//     // Mocking request body
//     const companyData = {
//       name: 'Test Company',
//       // Add other required fields here according to your schema
//     };

//     // Mocking JWT token
//     const token = 'mocked_jwt_token';

//     // Mocking JWT verification
//     const verifyMock = jest.spyOn(verifyToken, 'verify').mockImplementation(() => {
//       return {
//         user: {
//           role: Roles.SYSTEM_ADMIN // Assuming Roles.SYSTEM_ADMIN is the required role for company creation
//         }
//       } as ExtendedExpressRequest;
//     });

//     // Mocking company service
//     const createCompanyMock = jest.spyOn(companyService, 'createCompany').mockImplementation(async () => {
//       return 'mocked_company_id'; // Mocking the returned company ID
//     });

//     // Making the request
//     const response = await request(BASE_URL)
//       .post('/companies')
//       .set('Authorization', `Bearer ${token}`)
//       .send(companyData);

//     // Assertions
//     expect(response.status).toBe(200);
//     expect(response.body.success).toBe(true);
//     expect(response.body.message).toBe('Company created');
//     expect(response.body.data.id).toBe('mocked_company_id');

//     // Ensure the middleware and service functions were called
//     expect(verifyMock).toHaveBeenCalled();
//     expect(createCompanyMock).toHaveBeenCalledWith(companyData);

//     // Clean up mocks
//     verifyMock.mockRestore();
//     createCompanyMock.mockRestore();
//   });

//   // Add more test cases for unauthorized access, missing fields, etc.
// });
import request from 'supertest';
const BASE_URL = 'http://127.0.0.1:5001/fir-functions-9c002/us-central1/wb';

let token: string;
let companyId: string;
let userId: string;
describe('company', () => {
  it('return token for a valid user and create company', async () => {
    const companyName = {
      name: "hello"
    }

    const loginData = {
      email: "hello@bacancy.com",
      password: "af12f4d30f"
    }

    const res = await request(BASE_URL)
      .post('/api/auth/login')
      .send(loginData)
      .expect(200)

    expect(res.body).toHaveProperty('success', true)
    token = res.body.data.token

    const companyData = await request(BASE_URL)
      .post('/api/companies')
      .set('Authorization', `Bearer ${token}`)
      .send(companyName)
      .expect(200)

    expect(companyData.body).toHaveProperty('success', true)
    expect(companyData.body.data).toHaveProperty('id')
    companyId = companyData.body.data.id
  }, 20000)

  it('should get a company by ID', async () => {
    const response = await request(BASE_URL)
      .get(`/api/companies/${companyId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
  });

  it('should update a company', async () => {
    const updatedCompany = {
      name: 'Updated Test Company',
    };

    const response = await request(BASE_URL)
      .put(`/api/companies/${companyId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedCompany)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
  });


  it('should delete a company', async () => {
    const response = await request(BASE_URL)
      .delete(`/api/companies/${companyId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
  });


  it('should create a new company user POST /api/companies/:companyId/users', async () => {
    const companyName = {
      name: "yaah haa"
    }
    const companyData = await request(BASE_URL)
      .post('/api/companies')
      .set('Authorization', `Bearer ${token}`)
      .send(companyName)
      .expect(200)

    expect(companyData.body).toHaveProperty('success', true)
    expect(companyData.body.data).toHaveProperty('id')
    companyId = companyData.body.data.id
    const newUser = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@example.com',
    };

    const response = await request(BASE_URL)
      .post(`/api/companies/${companyId}/users`)
      .set('Authorization', `Bearer ${token}`)
      .send(newUser)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body.data.user).toHaveProperty('id');
    userId = response.body.data.user.id;
  });


  it('should update a company user /api/companies/:companyId/users/:userId', async () => {
    const updatedUser = {
      firstname: 'Jane',
      lastname: 'Smith',
      email: 'janesmith@example.com',
    };

    const response = await request(BASE_URL)
      .put(`/api/companies/${companyId}/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedUser)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
  });


  it('should delete a company user DELETE /api/companies/:companyId/users/:userId', async () => {
    const response = await request(BASE_URL)
      .delete(`/api/companies/${companyId}/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
  });

});