import { z } from 'zod';

// 路由 id 参数校验
export const idSchema = z.object({
  id: z.coerce.number().int('id 必须为整数').positive('id 必须为正整数'),
});
