import { z } from 'zod';
import { queryBoolean } from '@/validators/commonValidators';

// 菜单查询参数校验
export const menuQuerySchema = z.object({
  name: z.string().optional(),
  status: queryBoolean.optional(),
});

const commonFields = {
  parentId: z.number('parentId 类型错误').int('parentId 必须为整数').min(0, 'parentId 不能为负数').optional(),
  name: z.string().nonempty('菜单名不能为空'),
  icon: z.string().optional(),
  sort: z.number().int('排序值必须为整数').min(0, '排序值不能为负数').optional(),
  status: z.boolean().optional(),
};

const routeFields = {
  routeName: z.string().nonempty('路由名称不能为空'),
  path: z.string().nonempty('路由不能为空'),
  keepAlive: z.boolean().optional(),
  activeMenu: z.string().optional(),
  hideInMenu: z.boolean().optional(),
  hideInTag: z.boolean().optional(),
  hideParent: z.boolean().optional(),
};

// 目录 (type=0)：有路由，无组件路径和权限标识
const directorySchema = z.object({
  ...commonFields,
  ...routeFields,
  type: z.literal(0),
});

// 菜单 (type=1)：有路由，组件路径必填
const pageMenuSchema = z.object({
  ...commonFields,
  ...routeFields,
  type: z.literal(1),
  componentPath: z.string().nonempty('组件路径不能为空'),
});

// 按钮 (type=2)：无路由，权限标识必填
const buttonSchema = z.object({
  ...commonFields,
  type: z.literal(2),
  routeName: z.string().default(''),
  path: z.string().default(''),
  perm: z.string().nonempty('权限标识不能为空'),
});

// 菜单校验
export const menuSchema = z.discriminatedUnion('type', [
  directorySchema,
  pageMenuSchema,
  buttonSchema,
]);
