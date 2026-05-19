import type { Request, Response } from 'express';
import { fail } from '@/utils/response';

/**
 * 异步控制器包装器，统一处理 try/catch 错误响应
 * @param fn - 异步控制器函数
 *
 * @example
 * export const getList = asyncHandler(async (req, res) => {
 *   const data = await service.getList();
 *   success(res, data);
 * });
 */
export function asyncHandler(fn: (req: Request, res: Response) => Promise<void>) {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    }
    catch (e: any) {
      fail(res, e.message);
    }
  };
}
