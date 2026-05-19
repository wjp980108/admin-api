type TreeNode<T> = T & { children: TreeNode<T>[] };

/**
 * 将平铺数组转换为树形结构
 * @param items - 平铺数据数组，每项需包含 id、parentId
 * @param parentId - 根节点的父级 ID，默认为 0
 * @returns 树形结构数组
 */
export function buildTree<T extends { id: number; parentId: number }>(
  items: T[],
  parentId = 0,
): TreeNode<T>[] {
  return items
    .filter(item => item.parentId === parentId)
    .map(item => ({ ...item, children: buildTree(items, item.id) }));
}
