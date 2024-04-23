// import supertest from 'supertest';
import app from '../app.js';

import request from 'supertest';
// import app from '../app';

describe('User Routes', () => {
  describe('POST /api/users/system-admin', () => {
    it('should create a system admin user with valid data', async () => {
      const userData = {
        email: 'test@example.com',
        firstname: 'John',
        lastname: 'Doe',
      };

      const res = await request(app)
        .post('/api/users/system-admin')
        .set('x-api-key', process.env.SYSTEM_ADMIN_KEY)
        .send(userData)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.message).toBe('User created successfully');
    });

    it('should return 401 Unauthorized with invalid x-api-key', async () => {
      const userData = {
        email: 'test@example.com',
        firstname: 'John',
        lastname: 'Doe',
      };

      const res = await request(app)
        .post('/api/users/system-admin')
        .set('x-api-key', 'invalid-api-key')
        .send(userData)
        .expect(401);

      expect(res.body.error).toBe('Unauthorized');
    });

    it('should return 400 Bad Request with invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        firstname: 'John',
        lastname: 'Doe',
      };

      const res = await request(app)
        .post('/api/users/system-admin')
        .set('x-api-key', process.env.SYSTEM_ADMIN_KEY)
        .send(userData)
        .expect(400);

      expect(res.body.error).toBe('Invalid data');
      expect(res.body.details).toContainEqual({
        message: 'email is Invalid email',
      });
    });

    it('should return 400 Bad Request with missing fields', async () => {
      const userData = {
        email: 'test@example.com',
      };

      const res = await request(app)
        .post('/api/users/system-admin')
        .set('x-api-key', process.env.SYSTEM_ADMIN_KEY)
        .send(userData)
        .expect(400);

      expect(res.body.error).toBe('Invalid data');
      // expect(res.body.details).toContainEqual([{"message": "firstname is Required"}, {"message": "lastname is Required"}]);
      expect(res.body.details).toContainEqual(
        expect.objectContaining({ message: 'firstname is Required' })
      );
      expect(res.body.details).toContainEqual(
        expect.objectContaining({ message: 'lastname is Required' })
      );
    });
  });
});
// describe('User', () => {
//   it('should create a new user', async () => {
//     const userData = {
//       firstname: 'Test',
//       lastname: 'User',
//       email: 'test@example.com',
//     };

//     const res = await supertest(app)
//       .post('/api/users/system-admin')
//       .send(userData)
//       .set('x-api-key', process.env.SYSTEM_ADMIN_KEY)
//       .expect(200);
//   });
// });
// describe('User',()=>{
//   it('should create a new user',async (done)=>{
//     const userData = {
//       firstname: 'Test',
//       lastname: 'User',
//       email: 'test@example.com',
//     };
//     supertest('/api/users')
//       .post('/system-admin')
//       .send(userData)
//       .set('x-api-key', process.env.SYSTEM_ADMIN_KEY)
//       .end(function(err,res){
//         expect(res.statusCode).toBe(200)
//         if(err){
//           throw err
//         }
//         done()
//       })
//   })
// })

 
    
// const res = await supertest(app).post('/api/users/system-admin')
// .send(userData)
// .set('x-api-key', process.env.SYSTEM_ADMIN_KEY)
// .expect(200);

// expect(res)




// describe('User Routes', () => {
//   describe('POST /system-admin', () => {
//     it('should create a system admin user', async () => {
//       const userData = {
//         username: 'testuser',
//         firstname: 'Test',
//         lastname: 'User',
//         email: 'test@example.com',
//         role: 'SYSTEM_ADMIN',
//         roleId: '',
//         companyId: '',
//       };

//       const res = await supertest(app).post('/api/users/system-admin')
//         // .post('/system-admin')
//         .set('x-api-key', process.env.SYSTEM_ADMIN_KEY)
//         .send(userData)
//         .expect(200);

//       expect(res.body.success).toBe(true);
//       expect(res.body.data).toHaveProperty('id');
//       expect(res.body.message).toBe('User created successfully');
//     });

//     it('should return 401 if invalid x-api-key is provided', async () => {
//       const userData = {
//         username: 'testuser',
//         firstname: 'Test',
//         lastname: 'User',
//         email: 'test@example.com',
//         role: 'SYSTEM_ADMIN',
//         roleId: '',
//         companyId: '',
//       };

//       const res = await supertest(app)
//         .post('/system-admin')
//         .set('x-api-key', 'invalid-api-key')
//         .send(userData)
//         .expect(401);

//       expect(res.body.success).toBe(false);
//       expect(res.body.message).toBe('Unauthorized');
//     });
//   });
// });

// const sum = require('./sum');
// import {sum} from '../controllers/sum.js'

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

describe('Example test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});