import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '@/generated/prisma/client';
import 'dotenv/config';

// 创建 MariaDB 连接池适配器
const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST, // 数据库主机地址，例如 "localhost" 或远程 IP
  user: process.env.DATABASE_USER, // 数据库登录用户名
  password: process.env.DATABASE_PASSWORD, // 数据库登录密码（禁止硬编码，必须从环境变量读取）
  database: process.env.DATABASE_NAME, // 目标数据库名称

  connectionLimit: 5, // 连接池最大连接数，根据服务器负载适当调整
  allowPublicKeyRetrieval: true, // 允许从服务器获取 RSA 公钥，MySQL 8+ / MariaDB 某些认证插件需要开启
});

// 初始化 Prisma Client，注入 MariaDB 适配器
const prisma = new PrismaClient({ adapter });

export default prisma;
