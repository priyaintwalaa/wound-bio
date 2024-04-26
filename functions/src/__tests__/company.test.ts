// import request from 'supertest';
// const BASE_URL = 'http://127.0.0.1:5001/fir-functions-9c002/us-central1/wb';

// let token: string;
// let companyId: string;
// let userId: string;
// describe('company', () => {
//   it('return token for a valid user and create company', async () => {
//     const companyName = {
//       name: "hello"
//     }

//     const loginData = {
//       email: "hello@bacancy.com",
//       password: "af12f4d30f"
//     }

//     const res = await request(BASE_URL)
//       .post('/api/auth/login')
//       .send(loginData)
//       .expect(200)

//     expect(res.body).toHaveProperty('success', true)
//     token = res.body.data.token
//     userId = res.body.data.user.id

//     const companyData = await request(BASE_URL)
//       .post('/api/companies')
//       .set('Authorization', `Bearer ${token}`)
//       .send(companyName)
//       .expect(200)

//     expect(companyData.body).toHaveProperty('success', true)
//     expect(companyData.body.data).toHaveProperty('id')
//     companyId = companyData.body.data.id
   
//   }, 20000)

//   it('should update a company', async () => {
//     const updatedCompany = {
//       name: 'Updated Test Company',
//     };

//     const response = await request(BASE_URL)
//       .put(`/api/companies/${companyId}`)
//       .set('Authorization', `Bearer ${token}`)
//       .send(updatedCompany)
//       .expect(200);

//     expect(response.body).toHaveProperty('success', true);
//   });


//   it('should delete a company', async () => {
//     const response = await request(BASE_URL)
//       .delete(`/api/companies/${companyId}`)
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200);

//     expect(response.body).toHaveProperty('success', true);
//   });

   

//   it('should create a new company user POST /api/companies/:companyId/users', async () => {
//     const companyName = {
//       name: "yupppiiii"
//     }
//     const companyData = await request(BASE_URL)
//       .post('/api/companies')
//       .set('Authorization', `Bearer ${token}`)
//       .send(companyName)
//       .expect(200)

//     expect(companyData.body.data).toHaveProperty('id')
//     companyId = companyData.body.data.id

//     const userUpdate = await request(BASE_URL)
//     .put(`/api/users/${userId}`)
//     .set('Authorization', `Bearer ${token}`)
//     .send({companyId})
//     .expect(200)

//     expect(userUpdate.body).toHaveProperty('success', true);

//     const newUser = {
//       firstname: 'John',
//       lastname: 'Doe',
//       email: 'doeeJohnn@example.com',
//       companyId,
//       role:'companyadmin'
//     };

//     const response = await request(BASE_URL)
//       .post(`/api/companies/${companyId}/users`)
//       .set('Authorization', `Bearer ${token}`)
//       .send(newUser)
//       .expect(200);

//     expect(response.body).toHaveProperty('success', true);
//     expect(response.body.data.user).toHaveProperty('id');
//     userId = response.body.data.user.id;
//   });

//   it('should get a company by ID', async () => {
//     const response = await request(BASE_URL)
//       .get(`/api/companies/${companyId}`)
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200);

//     expect(response.body).toHaveProperty('success', true);
//   });


//   it('should update a company user /api/companies/:companyId/users/:userId', async () => {
//     const updatedUser = {
//       firstname: 'Jane',
//       lastname: 'Smith',
//       email: 'SmiithennJanee@example.com',
//     };

//     const response = await request(BASE_URL)
//       .put(`/api/companies/${companyId}/users/${userId}`)
//       .set('Authorization', `Bearer ${token}`)
//       .send(updatedUser)
//       .expect(200);

//     expect(response.body).toHaveProperty('success', true);
//   });


//   it('should delete a company user DELETE /api/companies/:companyId/users/:userId', async () => {
//     const response = await request(BASE_URL)
//       .delete(`/api/companies/${companyId}/users/${userId}`)
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200);

//     expect(response.body).toHaveProperty('success', true);
//   });

// });

describe('Example test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});