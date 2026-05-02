import type { Response } from 'express';

/**
 * 返回成功响应
 * @param res     - Express Response 对象
 * @param data    - 返回给客户端的业务数据，默认为 null
 * @param message - 提示信息，默认为 "操作成功"
 * @param code    - HTTP 状态码，默认为 200
 *
 * @example
 * success(res, { id: 1, name: 'Alice' });
 * success(res, null, '创建成功', 201);
 */
export function success(res: Response, data: any = null, message = '操作成功', code = 200) {
  res.status(code).json({
    code,
    message,
    data,
  });
}

/**
 * 返回失败响应
 * @param res     - Express Response 对象
 * @param message - 错误提示信息，默认为 "操作失败"
 * @param code    - HTTP 状态码，默认为 400（客户端错误）
 *
 * @example
 * fail(res, '用户名已存在', 409);
 * fail(res, '服务器内部错误', 500);
 */
export function fail(res: Response, message = '操作失败', code = 400) {
  res.status(code).json({
    code,
    message,
  });
}
