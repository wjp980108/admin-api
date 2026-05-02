import bcrypt from 'bcrypt';
import prisma from '@/config/database';
import 'dotenv/config';

// 初始化 admin 账户
async function initAccount() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      name: '超级管理员',
      phone: '18530802747',
      username: 'admin',
      password: hashedPassword,
    },
  });
}

initAccount().catch(console.error).finally(() => prisma.$disconnect());
