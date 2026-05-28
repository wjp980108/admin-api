import { z } from 'zod';
import { paginationSchema, queryBoolean } from '@/validators/commonValidators';

// 用户查询参数校验
export const userQuerySchema = paginationSchema.extend({
  name: z.string().optional(),
  phone: z.string().optional(),
  status: queryBoolean.optional(),
});

// 用户校验
export const userSchema = z.object({
  username: z.string().nonempty('用户名不能为空'),
  password: z.string().nonempty('密码不能为空'),
  nickname: z.string().optional(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
  email: z.string().optional(),
  status: z.boolean().optional(),
  roleIds: z.array(z.number()).optional(),
});
