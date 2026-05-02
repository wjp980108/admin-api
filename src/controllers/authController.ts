import type { Request, Response } from 'express';
import * as authService from '@/services/authService';
import { loginSchema } from '@/types/schemas';
import { fail, success } from '@/utils/response';

export async function login(req: Request, res: Response) {
  try {
    // 校验请求参数
    const result = loginSchema.safeParse(req.body);

    // 参数校验失败
    if (!result.success)
      return fail(res, result.error.issues[0].message);

    const { username, password } = result.data;

    const token = await authService.login(username, password);
    success(res, token, '登录成功');
  }
  catch (error: any) {
    fail(res, error.message, 401);
  }
}
