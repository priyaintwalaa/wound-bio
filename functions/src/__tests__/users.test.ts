import request from 'supertest';

const BASE_URL = 'http://127.0.0.1:5001/fir-functions-9c002/us-central1/wb';
const adminKey = process.env.SYSTEM_ADMIN_KEY

  // describe('POST api for all /api/users', () => {
  //   it('should create a new system user and return with role', async () => {
  //     const nUser = {
  //       firstname: 'heell',
  //       lastname: 'heell',
  //       email: 'pqr@bacancy.com',
  //     };

  //     const response = await request(BASE_URL)
  //       .post('/api/users/system-admin')
  //       .set('x-api-key', adminKey)
  //       .send(nUser)
  //       .expect(200)

  //     expect(response.body).toHaveProperty('success', true);
  //     expect(response.body).toHaveProperty('message', 'User created succesfully');
  //     expect(response.body.data).toHaveProperty('role');
  //   },20000);

  //   it('should return 401 Unauthorized with invalid x-api-key', async () => {
  //     const userData = {
  //       email: 'mydata0704@gmail.com',
  //       firstname: 'John',
  //       lastname: 'Doe',
  //     };

  //     const res = await request(BASE_URL)
  //       .post('/api/users/system-admin')
  //       .set('x-api-key', 'invalid-api-key')
  //       .send(userData)
  //       .expect(401);

  //     expect(res.body.error).toBe('Unauthorized');
  //   }, 20000);


  //   it('should return 400 Bad Request with invalid email', async () => {
  //     const userData = {
  //       email: 'invalid-email',
  //       firstname: 'John',
  //       lastname: 'Doe',
  //     };

  //     const res = await request(BASE_URL)
  //       .post('/api/users/system-admin')
  //       .set('x-api-key', adminKey)
  //       .send(userData)
  //       .expect(400);

  //     expect(res.body.error).toBe('Invalid data')
  //   });

  //   it('should return 400 Bad Request with missing fields', async () => {
  //     const userData = {
  //       email: 'mydata0704@gmail.com',
  //     };

  //     const res = await request(BASE_URL)
  //       .post('/api/users/system-admin')
  //       .set('x-api-key', adminKey)
  //       .send(userData)
  //       .expect(400);

  //     expect(res.body.error).toBe('Invalid data')
  //     expect(res.body.details).toContainEqual(
  //       expect.objectContaining({ message: 'firstname is Required' })
  //     );
  //     expect(res.body.details).toContainEqual(
  //       expect.objectContaining({ message: 'lastname is Required' })
  //     );
  //   });

  //   const wuser = {
  //     firstname: 'kllek',
  //     lastname: 'kkel',
  //     email: 'klelwdw@ebacancy.com',
  //   }
  //   let userId: string
  //   describe('POST /api/users', () => {
  //     it('should create a new user', async () => {
  //       const response = await request(BASE_URL)
  //         .post('/api/users')
  //         .send(wuser)
  //         .expect(200)

  //         console.log(response.body);

  //       expect(response.body).toHaveProperty('success', true);
  //       expect(response.body.data).toHaveProperty('id');
  //       userId = response.body.data.id;
  //     });
  //   });

  //   describe('GET /api/users/:id', () => {
  //     it('should get a user by ID', async () => {
  //       const response = await request(BASE_URL)
  //         .get(`/api/users/${userId}`)
  //         .expect(200);

  //       expect(response.body).toHaveProperty('success', true);
  //       expect(response.body.data).toHaveProperty('firstname', wuser.firstname);
  //       expect(response.body.data).toHaveProperty('lastname', wuser.lastname);
  //       expect(response.body.data).toHaveProperty('email', wuser.email);
  //     });

  //     it('should return an error when the user ID does not exist', async () => {
  //       const nonExistentUserId = 'invalid-user-id';
  //       const response = await request(BASE_URL)
  //         .get(`/api/users/${nonExistentUserId}`)

  //       expect(response.body).toHaveProperty('success', false);
  //       });
  //   });

  //   describe('PUT /api/users/:id', () => {
  //     it('should update a user', async () => {
  //       const updatedUser = {
  //         firstname: 'Jane',
  //         lastname: 'Smith',
  //         email: 'janesmith@example.com',
  //       };

  //       const response = await request(BASE_URL)
  //         .put(`/api/users/${userId}`)
  //         .send(updatedUser)
  //         .expect(200);

  //       expect(response.body).toHaveProperty('success', true);
  //       expect(response.body).toHaveProperty('message', 'User updated succesfully');
  //       expect(response.body.data).toHaveProperty('firstname', updatedUser.firstname);
  //       expect(response.body.data).toHaveProperty('lastname', updatedUser.lastname);
  //       expect(response.body.data).toHaveProperty('email', updatedUser.email);
  //     });

  //     it('should return an error when the user ID does not exist', async () => {
  //       const nonExistentUserId = 'invalid-user-id';
  //       const updatedUser = {
  //         firstname: 'Jane',
  //         lastname: 'Smith',
  //         email: 'janesmith@example.com',
  //       };

  //       const response = await request(BASE_URL)
  //         .put(`/api/users/${nonExistentUserId}`)
  //         .send(updatedUser)

  //       expect(response.body).toHaveProperty('success', false);

  //     });
  //   });

  //   describe('DELETE /api/users/:id', () => {
  //     it('should delete a user', async () => {
  //       const response = await request(BASE_URL)
  //         .delete(`/api/users/${userId}`)
  //         .expect(200);

  //       expect(response.body).toHaveProperty('success', true);
  //       expect(response.body).toHaveProperty('message', 'User deleted succesfully');
  //     });
  //     it('should return an error when the user ID does not exist', async () => {
  //       const nonExistentUserId = 'invalid-user-id';

  //       const response = await request(BASE_URL)
  //         .delete(`/api/users/${nonExistentUserId}`)

  //       expect(response.body).toHaveProperty('success', true);
  //     });
  //   });
  // });

describe('Example test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});
