import type { RoleCreateData, RoleQuery, RoleUpdateData } from '@/types/role';
import prisma from '@/config/database';

// 获取全量角色列表
export async function getRoleAll() {
  return prisma.role.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

// 获取带分页的角色列表
export async function getRoleList(query: RoleQuery) {
  const { name, status, page = 1, pageSize = 10 } = query;

  const where = {
    ...(name && { name: { contains: name } }),
    ...(status !== undefined && { status }),
  };

  // 开启事务，同时执行多个互不依赖的查询
  const [list, total] = await prisma.$transaction([
    // 查询当前页数据
    prisma.role.findMany({
      where,
      skip: (page - 1) * pageSize, // 当前页的前面有几页 * 每页几条
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    }),
    // 查询总条数
    prisma.role.count({ where }),
  ]);

  return { list, total };
}

// 新增角色
export async function addRole(data: RoleCreateData) {
  const { menuIds, ...roleData } = data;
  try {
    // 开启事务，使用同一个事务来操作数据
    return await prisma.$transaction(async (tx) => {
      // 新增角色
      const role = await tx.role.create({ data: roleData });

      if (menuIds !== undefined && menuIds.length > 0) {
        await tx.roleMenu.createMany({
          data: menuIds.map(menuId => ({ roleId: role.id, menuId })),
        });
      }

      return role;
    });
  }
  catch (error: any) {
    if (error.code === 'P2002')
      throw new Error('当前角色已存在');

    throw error;
  }
}

// 编辑角色
export async function updateRole(id: number, data: RoleUpdateData) {
  const { menuIds, ...roleData } = data;

  try {
    // 开启事务，使用同一个事务来操作数据
    return await prisma.$transaction(async (tx) => {
      // 更新角色信息
      const role = await tx.role.update({
        where: { id },
        data: roleData,
      });

      if (menuIds !== undefined) {
        // 删除旧的关联菜单
        await tx.roleMenu.deleteMany({
          where: { roleId: role.id },
        });

        // 插入新的关联菜单
        if (menuIds.length > 0) {
          await tx.roleMenu.createMany({
            data: menuIds.map(menuId => ({ roleId: id, menuId })),
          });
        }
      }

      return role;
    });
  }
  catch (error: any) {
    if (error.code === 'P2025') {
      throw new Error('角色不存在');
    }
    throw error;
  }
}

// 删除角色
export async function deleteRole(id: number) {
  try {
    return await prisma.role.delete({
      where: { id },
    });
  }
  catch (error: any) {
    if (error.code === 'P2025') {
      throw new Error('角色不存在');
    }
    throw error;
  }
}

// 更新菜单状态
export async function updateRoleStatus(id: number, status: boolean) {
  if (!status) {
    const userCount = await prisma.userRole.count({ where: { roleId: id } });
    if (userCount > 0)
      throw new Error(`该角色已被 ${userCount} 个用户使用，请先解除关联后再禁用`);
  }

  try {
    return await prisma.role.update({
      where: { id },
      data: { status },
    });
  }
  catch (error: any) {
    if (error.code === 'P2025')
      throw new Error('角色不存在');

    throw error;
  }
}
