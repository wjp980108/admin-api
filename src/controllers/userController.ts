import type { Response } from 'express';
import type { AuthRequest } from '@/middlewares/authMiddleware';
import * as userService from '@/services/userService';
import { fail, success } from '@/utils/response';

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
