import { defineConfig, env } from 'prisma/config';
import 'dotenv/config';

export default defineConfig({
  // schema 文件路径（支持单文件或目录）
  // 指向目录时，Prisma 会合并目录下所有 .prisma 文件  schema: 'prisma/schema',
  schema: 'prisma/schema',
  migrations: {
    // 数据库迁移文件的存放目录
    // 运行 `prisma migrate dev` 时，迁移文件会生成在此路径下
    path: 'prisma/migrations',
  },
  datasource: {
    // 数据库连接字符串，从环境变量 DATABASE_URL 中读取
    // 在 .env 中配置，格式示例：
    // DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
    url: env('DATABASE_URL'),
  },
});
