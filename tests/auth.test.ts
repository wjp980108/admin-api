import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../src/app';

describe('认证接口', () => {
  describe('post /api/auth/login', () => {
    it('登录成功应该返回 token', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'admin', password: '123456' });

      expect(res.status).toBe(200);
      expect(res.body.code).toBe(200);
      expect(res.body.data).toBeTruthy();
    });
  });
});
