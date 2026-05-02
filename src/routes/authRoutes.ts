import { Router } from 'express';
import { login } from '@/controllers/authController';
import { loginLimiter } from '@/middlewares/rateLimitMiddlewares';

const router = Router();

// 用户登录
router.post('/login', loginLimiter, login);

export default router;
