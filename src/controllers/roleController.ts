import * as roleService from '@/services/roleService';
import { asyncHandler } from '@/utils/handler';
import { success } from '@/utils/response';
import { validate } from '@/utils/validate';
import { idSchema, statusSchema } from '@/validators/commonValidators';
import { roleQuerySchema, roleSchema } from '@/validators/roleValidators';

// 获取全量角色列表
export const getRoleAll = asyncHandler(async (req, res) => {
  const roles = await roleService.getRoleAll();
  success(res, roles);
});

// 获取带分页的角色列表
export const getRoleList = asyncHandler(async (req, res) => {
  const query = validate(roleQuerySchema, req.query);
  const role = await roleService.getRoleList(query);
  success(res, role);
});

// 新增角色
export const addRole = asyncHandler(async (req, res) => {
  const data = validate(roleSchema, req.body);
  await roleService.addRole(data);
  success(res);
});

// 编辑角色
export const updateRole = asyncHandler(async (req, res) => {
  const { id } = validate(idSchema, req.params);
  const data = validate(roleSchema, req.body);
  await roleService.updateRole(id, data);
  success(res);
});

// 删除角色
export const deleteRole = asyncHandler(async (req, res) => {
  const { id } = validate(idSchema, req.params);
  await roleService.deleteRole(id);
  success(res);
});

// 更新角色状态
export const updateRoleStatus = asyncHandler(async (req, res) => {
  const { id } = validate(idSchema, req.params);
  const { status } = validate(statusSchema, req.body);
  await roleService.updateRoleStatus(id, status);
  success(res);
});
