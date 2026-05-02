import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { fail } from '@/utils/response';

// 扩展 Request 类型，加上 userId 字段
export interface AuthRequest extends Request {
  userId?: number;
  phone?: string;
  username?: string;
}

/**
 * JWT 身份认证中间件
 * 从请求头中提取并校验 token，将用户信息挂载到 req 上后交给下一个中间件
 */
export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  // token 不存在
  if (!token)
    return fail(res, '未提供 Token', 401);

  try {
    // 校验 token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

    req.userId = decoded.userId;
    req.phone = decoded.phone;
    req.username = decoded.username;
    next();
  }
  catch {
    fail(res, 'Token 无效或已过期', 401);
  }
}
