import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../src/app';

describe('用户接口', () => {
  describe('gET /api/user/info', () => {
    it('没有 Token 应该返回 401', async () => {
      const res = await request(app).get('/api/user/info');

      expect(res.status).toBe(401);
      expect(res.body.code).toBe(401);
    });

    it('token 有效应该返回用户信息', async () => {
      // 先登录拿到 token
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ username: 'admin', password: '123456' });

      const token = loginRes.body.data.token;

      // 用 token 请求用户信息
      const res = await request(app)
        .get('/api/user/info')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.code).toBe(200);
      expect(res.body.data.name).toBe('超级管理员');
    });
  });
});
