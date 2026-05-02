import { Router } from 'express';
import { getUsrInfo } from '@/controllers/userController';
import { authenticate } from '@/middlewares/authMiddleware';

const router = Router();

// 获取当前用户信息
router.get('/info', authenticate, getUsrInfo);

export default router;
