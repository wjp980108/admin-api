import type { NextFunction, Request, Response } from 'express';
import logger from '@/config/logger';
import { fail } from '@/utils/response';

/**
 * Express 全局错误处理中间件
 * 当任意路由或中间件调用 next(err) 时，Express 会跳过普通中间件，直接进入此函数
 */
export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  // 记录错误日志：请求方法 + 路径 + 错误信息，便于快速定位问题
  logger.error(`${req.method} ${req.path} - ${err.message}`);

  // 返回 500 响应，优先使用错误对象自带的 message，兜底提示"服务器内部错误"
  fail(res, err.message || '服务器内部错误', 500);
}
