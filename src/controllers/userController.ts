import type { Response } from 'express';
import type { AuthRequest } from '@/middlewares/authMiddleware';
import * as userService from '@/services/userService';
import { asyncHandler } from '@/utils/handler';
import { fail, success } from '@/utils/response';
import { validate } from '@/utils/validate';
import { idSchema } from '@/validators/commonValidators';
import { userSchema } from '@/validators/userValidators';

// 获取用户列表
export const getUserList = asyncHandler(async (req, res) => {
  const role = await userService.getUserList(req.query);
  success(res, role);
});

// 新增用户
export const addUser = asyncHandler(async (req, res) => {
  const data = validate(userSchema, req.body);
  await userService.addUser(data);
  success(res);
});

// 编辑用户
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = validate(idSchema, req.params);
  const data = validate(userSchema, req.body);
  await userService.updateUser(id, data);
  success(res);
});

// 删除用户
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = validate(idSchema, req.params);
  await userService.deleteUser(id);
  success(res);
});

// 获取用户信息
export async function getUserInfo(req: AuthRequest, res: Response) {
  try {
    const userInfo = await userService.getUserInfo(req.userId!);
    success(res, userInfo, '获取成功');
  }
  catch (error: any) {
    fail(res, error.message, 401);
  }
}
