import { z } from 'zod';

// 路由 id 参数校验
export const idSchema = z.object({
  id: z.coerce.number().int('id 必须为整数').positive('id 必须为正整数'),
});

// 状态校验
export const statusSchema = z.object({
  status: z.boolean(),
});

// 分页参数校验（query string 自动 coerce）
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().positive().optional().default(10),
});

// query string 布尔值转换：仅接受 "true" / "false"，z.coerce.boolean() 不适用于 query（Boolean("false") === true）
export const queryBoolean = z.enum(['true', 'false']).transform(v => v === 'true');
