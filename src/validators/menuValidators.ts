import { z } from 'zod';

// 菜单校验
export const menuSchema = z.object({
  parentId: z.number('parentId 类型错误').int('parentId 必须为整数').min(0, 'parentId 不能为负数').optional(),
  routeName: z.string().nonempty('路由名称不能为空'),
  name: z.string().nonempty('菜单名不能为空'),
  path: z.string().nonempty('路由不能为空'),
  componentPath: z.string().optional(),
  icon: z.string().optional(),
  sort: z.number().int('排序值必须为整数').min(0, '排序值不能为负数').optional(),
  type: z.union([z.literal(0), z.literal(1), z.literal(2)], { error: 'type 只能为 0（目录）、1（菜单）、2（按钮）' }),
  perm: z.string().optional(),
  keepAlive: z.boolean().optional(),
  activeMenu: z.boolean().optional(),
  hideInMenu: z.boolean().optional(),
  hideInTag: z.boolean().optional(),
  hideParent: z.boolean().optional(),
  status: z.boolean().optional(),
});
