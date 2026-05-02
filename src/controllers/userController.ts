import type { Response } from 'express';
import type { AuthRequest } from '@/middlewares/authMiddleware';
import type { UserResponse } from '@/types/user';
import * as userService from '@/services/userService';
import { fail, success } from '@/utils/response';

export async function getUsrInfo(req: AuthRequest, res: Response) {
  try {
    const user = await userService.getUserInfo(req.userId!);

    if (!user)
      return fail(res, '用户不存在', 404);

    success(res, user as UserResponse);
  }
  catch {
    fail(res, '服务器错误', 500);
  }
}
