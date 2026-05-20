import { z } from 'zod';

// 角色校验
export const roleSchema = z.object({
  name: z.string().nonempty('角色名不能为空'),
  description: z.string().optional(),
  status: z.boolean().optional(),
  menuIds: z.array(z.number()).optional(),
});
