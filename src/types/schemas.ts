import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().nonempty('用户名不能为空'),
  password: z.string().nonempty('密码不能为空'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
