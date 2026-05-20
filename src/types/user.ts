import type { UserCreateInput, UserUpdateInput } from '@/generated/prisma/models/User';

export interface UserQuery {
  name?: string;
  phone?: string;
  status?: boolean;
  page?: number;
  pageSize?: number;
}

export interface UserCreateData extends UserCreateInput {
  roleIds?: number[];
}

export interface UserUpdateData extends Omit<UserUpdateInput, 'password'> {
  password?: string;
  roleIds?: number[];
}
