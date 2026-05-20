import { Router } from 'express';
import { addUser, deleteUser, getUserList, updateUser } from '@/controllers/userController';
import { authenticate } from '@/middlewares/authMiddleware';

const router = Router();

// 获取用户列表
router.get('/users', authenticate, getUserList);

// 新增用户
router.post('/users', authenticate, addUser);

// 编辑用户
router.put('/users/:id', authenticate, updateUser);

// 删除用户
router.delete('/users/:id', authenticate, deleteUser);

export default router;
