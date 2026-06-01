import { z } from 'zod';
import { paginationSchema, queryBoolean } from '@/validators/commonValidators';

// 角色查询参数校验
export const roleQuerySchema = paginationSchema.extend({
  name: z.string().optional(),
  status: queryBoolean.optional(),
});

// 角色校验
export const roleSchema = z.object({
  name: z.string().nonempty('角色名不能为空'),
  remark: z.string().optional(),
  status: z.boolean().optional(),
  menuIds: z.array(z.number()).optional(),
});
