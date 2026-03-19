const request = require('supertest');
const app = require('../app');

describe('API Tests', () => {
  test('GET /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});
