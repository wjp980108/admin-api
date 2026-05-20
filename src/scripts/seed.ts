import prisma from '@/config/database';
import { hashPassword } from '@/utils/password';
import 'dotenv/config';

// 初始化 admin 账户
async function initAccount() {
  const hashedPassword = await hashPassword('123456');

  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      nickname: '超级管理员',
      phone: '18530802747',
      username: 'admin',
      password: hashedPassword,
      isSystem: true,
    },
  });
}

initAccount().catch(console.error).finally(() => prisma.$disconnect());
