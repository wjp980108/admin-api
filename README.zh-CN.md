# Admin API

基于 Express + TypeScript + Prisma + MySQL 构建的后台管理系统 REST API。

## 技术栈

- **运行环境**：Node.js
- **开发语言**：TypeScript
- **Web 框架**：Express
- **ORM**：Prisma 7
- **数据库**：MySQL 8
- **身份验证**：JWT
- **参数验证**：Zod
- **日志**：Morgan + Winston
- **限流**：express-rate-limit
- **安全**：Helmet
- **测试**：Vitest + Supertest
- **包管理器**：pnpm

## 项目结构

``` text
admin-api
├── .github                # GitHub 配置文件
├── .husky                 # Husky 配置文件
├── logs                   # 运行时日志文件（不提交到 Git）
├── prisma                 # Prisma 相关
│   ├── migrations         # 数据库迁移文件
│   └── schema             # 数据库模型定义
├── src                    # 源代码
│   ├── config             # 配置文件（数据库连接等）
│   ├── controllers        # 控制器：解析请求，调用 Service，返回响应
│   ├── generated          # Prisma 自动生成的客户端（不提交到 Git）
│   ├── middlewares        # 中间件：鉴权、限流、错误处理等
│   ├── routes             # 路由定义
│   ├── scripts            # 脚本文件（数据初始化、任务脚本等）
│   ├── services           # 业务逻辑层
│   ├── types              # TypeScript 类型定义
│   ├── utils              # 工具函数
│   ├── app.ts             # Express 应用配置
│   └── server.ts          # 服务器启动入口
├── tests                  # 测试文件
├── .env                   # 环境变量（不提交到 Git）
├── .env.example           # 环境变量示例
├── .nvmrc                 # Node 版本管理配置
├── commitlint.config.js   # Git 提交规范配置
├── eslint.config.js       # ESlint 配置文件
├── LICENSE                # 开源协议
├── package.json           # 依赖与脚本
├── pnpm-lock.yaml         # pnpm 依赖锁定文件
├── prisma.config.ts       # Prisma 配置
├── README.md              # 项目介绍（英文）
├── README.zh-CN.md        # 项目介绍（中文）
├── tsconfig.json          # TypeScript 配置
└── vitest.config.json     # Vitest 测试框架配置
```

## 环境要求

- Node.js >= 18
- MySQL >= 8.0
- pnpm >= 8

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/wjp980108/admin-api.git
cd admin-api
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 配置环境变量

复制 `.env.example` 并重命名为 `.env`，填入你的配置：

```env
PORT=3000
NODE_ENV=development

DATABASE_URL="mysql://root:密码@localhost:3306/admin_api"
DATABASE_USER="root"
DATABASE_PASSWORD="密码"
DATABASE_NAME="admin_api"
DATABASE_HOST="localhost"
DATABASE_PORT=3306

JWT_SECRET="你的密钥"
JWT_EXPIRES_IN="7d"
```

### 4. 初始化数据库

```bash
# 执行数据库迁移，根据 schema 变更自动创建迁移文件并执行
pnpm db:dev

# 生成 Prisma Client 代码（src/generated 目录）
pnpm db:generate

# 初始化默认管理员账户（只需执行一次）
pnpm db:seed
```

### 5. 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:3000`，看到 `{"message":"API is running 🚀"}` 说明启动成功。

## 部署说明

**1. 上传以下文件到服务器**

```
dist               # 编译产物
prisma             # schema 和迁移文件
prisma.config.ts   # Prisma CLI 配置
package.json
```

**2. 服务器上执行**

```bash
# 安装依赖
pnpm install

# 创建并填写环境变量文件（只需执行一次）
cp .env.example .env
# 编辑 .env，填入生产环境配置，注意 NODE_ENV=production

# 执行数据库迁移
pnpm db:prod

# 初始化默认管理员账户（只需执行一次）
pnpm db:seed:prod

# 启动服务
pnpm start
```
