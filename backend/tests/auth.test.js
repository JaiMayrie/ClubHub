const request = require('supertest');
const app = require('../src/server');

describe('Auth Endpoints', () => {

  test('Register new user - success', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'unique@test.com',
        password: 'password123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  test('Register fails if fields missing', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@test.com' });

    expect(res.statusCode).toBe(400);
  });

  test('Register fails with invalid email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test',
        email: 'invalidemail',
        password: 'password123'
      });

    expect(res.statusCode).toBe(400);
  });

  test('Register fails with short password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test',
        email: 'test@test.com',
        password: '123'
      });

    expect(res.statusCode).toBe(400);
  });

  test('Login success (mocked)', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('Login fails if missing fields', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@test.com'
      });

    expect(res.statusCode).toBe(400);
  });

});