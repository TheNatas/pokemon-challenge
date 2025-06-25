import request from 'supertest';
import { app } from '..';

describe('GET /', () => {
  it('should return Hello from TypeScript!', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello from TypeScript!');
  });
});
