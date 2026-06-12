import { z } from 'zod';
import { paginationSchema, queryBoolean } from '@/validators/commonValidators';

// 用户查询参数校验
export const userQuerySchema = paginationSchema.extend({
  name: z.string().optional(),
  phone: z.string().optional(),
  status: queryBoolean.optional(),
  gender: z.number().optional(),
});

// 用户校验
export const userSchema = z.object({
  username: z.string().nonempty('用户名不能为空'),
  password: z.string().nonempty('密码不能为空'),
  nickname: z.string().optional(),
  phone: z.string().regex(/^1[3-9]\d{9}$/, '手机号格式不正确').optional(),
  avatar: z.string().optional(),
  email: z.email('邮箱格式不正确').optional(),
  gender: z.number().optional(),
  remark: z.string().optional(),
  status: z.boolean().optional(),
  roleIds: z.array(z.number()).optional(),
});

// 编辑：剔除 password 字段
export const userEditSchema = userSchema.omit({ password: true });
