import type { MenuCreateInput, MenuUpdateInput } from '@/generated/prisma/models/Menu';
import type { MenuQuery } from '@/types/menu';
import prisma from '@/config/database';
import { buildTree } from '@/utils/tree';

// 获取菜单列表
export async function getMenuList(query: MenuQuery) {
  const { name } = query;

  const menus = await prisma.menu.findMany({
    where: {
      ...(name && { name: { contains: name } }),
    },
    orderBy: { sort: 'asc' },
  });

  return buildTree(menus);
}

// 新增菜单
export async function addMenu(data: MenuCreateInput) {
  if (data.parentId) {
    const parent = await prisma.menu.findUnique({ where: { id: data.parentId } });
    if (!parent)
      throw new Error('父级菜单不存在');
  }

  try {
    return await prisma.menu.create({ data });
  }
  catch (error: any) {
    if (error.code === 'P2002')
      throw new Error('当前父级下菜单名称已存在');

    throw error;
  }
}

// 编辑菜单
export async function updateMenu(id: number, data: MenuUpdateInput) {
  const parentId = typeof data.parentId === 'number' ? data.parentId : undefined;

  if (parentId === id)
    throw new Error('父级菜单不能设为自身');

  if (parentId) {
    const parent = await prisma.menu.findUnique({ where: { id: parentId } });
    if (!parent)
      throw new Error('父级菜单不存在');
  }

  try {
    return await prisma.menu.update({
      where: { id },
      data,
    });
  }
  catch (error: any) {
    if (error.code === 'P2025') {
      throw new Error('菜单不存在');
    }
    throw error;
  }
}

// 删除菜单
export async function deleteMenu(id: number) {
  try {
    return await prisma.menu.delete({
      where: { id },
    });
  }
  catch (error: any) {
    if (error.code === 'P2025') {
      throw new Error('菜单不存在');
    }
    throw error;
  }
}

// 更新菜单状态
export async function updateMenuStatus(id: number, status: boolean) {
  if (!status) {
    const roleCount = await prisma.roleMenu.count({ where: { menuId: id } });
    if (roleCount > 0)
      throw new Error(`该菜单已被 ${roleCount} 个角色使用，请先解除关联后再禁用`);
  }

  try {
    return await prisma.menu.update({
      where: { id },
      data: { status },
    });
  }
  catch (error: any) {
    if (error.code === 'P2025')
      throw new Error('菜单不存在');

    throw error;
  }
}
