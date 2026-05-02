import type { UserResponse } from '@/types/user';
import prisma from '@/config/database';

export async function getUserInfo(userId: number): Promise<UserResponse | null> {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      phone: true,
      email: true,
      avatar: true,
    },
  });
}
