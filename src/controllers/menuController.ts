import * as menuService from '@/services/menuService';
import { asyncHandler } from '@/utils/handler';
import { success } from '@/utils/response';
import { validate } from '@/utils/validate';
import { idSchema, statusSchema } from '@/validators/commonValidators';
import { menuSchema } from '@/validators/menuValidators';

// 获取菜单列表
export const getMenuList = asyncHandler(async (req, res) => {
  const menu = await menuService.getMenuList(req.query);
  success(res, menu);
});

// 新增菜单
export const addMenu = asyncHandler(async (req, res) => {
  const data = validate(menuSchema, req.body);
  await menuService.addMenu(data);
  success(res);
});

// 编辑菜单
export const updateMenu = asyncHandler(async (req, res) => {
  const { id } = validate(idSchema, req.params);
  const data = validate(menuSchema, req.body);
  await menuService.updateMenu(id, data);
  success(res);
});

// 删除菜单
export const deleteMenu = asyncHandler(async (req, res) => {
  const { id } = validate(idSchema, req.params);
  await menuService.deleteMenu(id);
  success(res);
});

// 更新菜单状态
export const updateMenuStatus = asyncHandler(async (req, res) => {
  const { id } = validate(idSchema, req.params);
  const { status } = validate(statusSchema, req.body);
  await menuService.updateMenuStatus(id, status);
  success(res);
});
