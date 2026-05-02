import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '@/config/database';

export async function login(username: string, password: string) {
  // 根据用户名查找用户
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user)
    throw new Error('用户名或密码错误');

  // 验证密码
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    throw new Error('用户名或密码错误');

  // 生成 token
  const token = jwt.sign(
    { userId: user.id, phone: user.phone, username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn'] },
  );

  return {
    token,
  };
}
