import { Router } from 'express';
import { addRole, deleteRole, getRoleAll, getRoleList, updateRole } from '@/controllers/roleController';
import { authenticate } from '@/middlewares/authMiddleware';

const router = Router();

// 获取全量角色列表
router.get('/roles/all', authenticate, getRoleAll);

// 获取带分页的角色列表
router.get('/roles', authenticate, getRoleList);

// 新增角色
router.post('/roles', authenticate, addRole);

// 编辑角色
router.put('/roles/:id', authenticate, updateRole);

// 删除角色
router.delete('/roles/:id', authenticate, deleteRole);

export default router;
