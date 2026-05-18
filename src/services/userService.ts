import prisma from '@/config/database';

// 获取用户信息
export async function getUserInfo(userId: number) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      nickname: true,
      phone: true,
      email: true,
      avatar: true,
    },
  });

  if (!user)
    throw new Error('用户不存在');

  return {
    userId,
    nickname: user.nickname,
    phone: user.phone,
    email: user.email,
    avatar: user.avatar,
  };
}
