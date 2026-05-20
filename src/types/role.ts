import type { RoleCreateInput, RoleUpdateInput } from '@/generated/prisma/models/Role';

export interface RoleQuery {
  name?: string;
  status?: boolean;
  page?: number;
  pageSize?: number;
}

export interface RoleCreateData extends RoleCreateInput {
  menuIds?: number[];
}

export interface RoleUpdateData extends RoleUpdateInput {
  menuIds?: number[];
}
