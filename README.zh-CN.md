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

生产环境部署通过 GitHub Actions 自动完成（`.github/workflows/deploy.yml`）。每次推送到 `main` 分支，CI 会在 GitHub runner 上构建项目，rsync 到服务器，执行数据库迁移并重启 PM2 进程。

部署流程假定服务器（Linux）已经装好 Node.js（版本与 `.nvmrc` 一致）、pnpm 和 PM2。

### 服务器一次性配置

**1. 创建项目目录与 `.env`**

部署 workflow 要求目录和 `.env` 提前存在：

```bash
mkdir -p /www/wwwroot/admin/api
cd /www/wwwroot/admin/api

# 创建生产环境 .env（绝对不要提交到仓库）
cat > .env <<'EOF'
PORT=3000
NODE_ENV=production

DATABASE_URL="mysql://root:密码@localhost:3306/admin_api"
DATABASE_USER="root"
DATABASE_PASSWORD="密码"
DATABASE_NAME="admin_api"
DATABASE_HOST="localhost"
DATABASE_PORT=3306

JWT_SECRET="你的密钥"
JWT_EXPIRES_IN="7d"
EOF
chmod 600 .env
```

**2. 配置 PM2 开机自启**

不做这一步，服务器重启后 PM2 不会自动拉起项目。

```bash
# 注册 systemd 服务，让 PM2 在开机时启动
pm2 startup systemd -u root --hp /root
# 如果命令提示你执行某行 sudo 命令，按提示复制执行即可
```

PM2 进程启动并确认运行后（见下文），保存进程列表，PM2 才能在重启时恢复：

```bash
pm2 save
```

`pm2 save` 会把当前进程列表写到 `/root/.pm2/dump.pm2`，systemd 在开机时会读取这个文件恢复进程。部署 workflow 每次都会重新执行 `pm2 save`，保证 dump 文件与最新状态一致。

### 首次部署

1. 推送到 `main` —— workflow 会 rsync 文件、安装依赖、执行迁移。PM2 步骤会因为进程不存在而打印警告（这是预期行为）。
2. 通过你的进程管理工具启动项目（例如宝塔 PM2 管理器），**进程名设为 `server`**，**启动文件设为 `dist/server.js`**。
3. （可选）初始化默认管理员账户：
   ```bash
   pnpm db:seed:prod
   ```

### 后续部署

直接推送到 `main` 分支即可。workflow 会自动安装依赖、执行迁移并执行 `pm2 restart server`。进程在重新部署和服务器重启后都会保持运行。
