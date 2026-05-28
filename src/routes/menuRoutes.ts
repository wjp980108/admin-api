import { Router } from 'express';
import { addMenu, deleteMenu, getMenuList, updateMenu, updateMenuStatus } from '@/controllers/menuController';
import { authenticate } from '@/middlewares/authMiddleware';

const router = Router();

// 获取菜单列表
router.get('/menus', authenticate, getMenuList);

// 新增菜单
router.post('/menus', authenticate, addMenu);

// 编辑菜单
router.put('/menus/:id', authenticate, updateMenu);

// 删除菜单
router.delete('/menus/:id', authenticate, deleteMenu);

// 删除菜单
router.patch('/menus/:id/status', authenticate, updateMenuStatus);

export default router;
