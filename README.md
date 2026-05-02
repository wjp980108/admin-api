# Admin API

A REST API for backend management system built with Express + TypeScript + Prisma + MySQL.

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express
- **ORM**: Prisma 7
- **Database**: MySQL 8
- **Authentication**: JWT
- **Validation**: Zod
- **Logging**: Morgan + Winston
- **Rate Limiting**: express-rate-limit
- **Security**: Helmet
- **Testing**: Vitest + Supertest
- **Package Manager**: pnpm

## Project Structure

```text
admin-api
├── .github                # GitHub configuration
├── .husky                 # Husky configuration
├── logs                   # Runtime log files (not committed to Git)
├── prisma                 # Prisma related
│   ├── migrations         # Database migration files
│   └── schema             # Database model definitions
├── src                    # Source code
│   ├── config             # Configuration files (database connection, etc.)
│   ├── controllers        # Controllers: parse requests, call services, return responses
│   ├── generated          # Prisma auto-generated client (not committed to Git)
│   ├── middlewares        # Middlewares: auth, rate limiting, error handling, etc.
│   ├── routes             # Route definitions
│   ├── scripts            # Scripts (data initialization, task scripts, etc.)
│   ├── services           # Business logic layer
│   ├── types              # TypeScript type definitions
│   ├── utils              # Utility functions
│   ├── app.ts             # Express application setup
│   └── server.ts          # Server entry point
├── tests                  # Test files
├── .env                   # Environment variables (not committed to Git)
├── .env.example           # Environment variables example
├── .nvmrc                 # Node version configuration
├── commitlint.config.js   # Git commit convention configuration
├── eslint.config.js       # ESLint configuration
├── LICENSE                # License
├── package.json           # Dependencies and scripts
├── pnpm-lock.yaml         # pnpm lockfile
├── prisma.config.ts       # Prisma configuration
├── README.md              # README (English)
├── README.zh-CN.md        # README (Chinese)
├── tsconfig.json          # TypeScript configuration
└── vitest.config.json     # Vitest configuration
```

## Requirements

- Node.js >= 18
- MySQL >= 8.0
- pnpm >= 8

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/wjp980108/admin-api.git
cd admin-api
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Copy `.env.example` and rename it to `.env`, then fill in your configuration:

```env
PORT=3000
NODE_ENV=development

DATABASE_URL="mysql://root:password@localhost:3306/admin_api"
DATABASE_USER="root"
DATABASE_PASSWORD="password"
DATABASE_NAME="admin_api"
DATABASE_HOST="localhost"
DATABASE_PORT=3306

JWT_SECRET="your_secret_key"
JWT_EXPIRES_IN="7d"
```

### 4. Initialize the database

```bash
# Run database migrations
pnpm db:dev

# Generate Prisma Client (src/generated directory)
pnpm db:generate

# Seed default admin account (only needed once)
pnpm db:seed
```

### 5. Start the development server

```bash
pnpm dev
```

Visit `http://localhost:3000`, if you see `{"message":"API is running 🚀"}` the server is running successfully.

## Deployment

Production deployment is fully automated via GitHub Actions (`.github/workflows/deploy.yml`). Every push to `main` builds the project on a GitHub runner, rsyncs the artifact to the server, runs migrations, and restarts the PM2 process.

The flow assumes a Linux server with Node.js (matching `.nvmrc`), pnpm, and PM2 already available.

### One-time server setup

**1. Create the project directory and `.env`**

The deploy workflow expects the directory and `.env` to already exist:

```bash
mkdir -p /www/wwwroot/admin/api
cd /www/wwwroot/admin/api

# Create .env with production secrets — never commit this file
cat > .env <<'EOF'
PORT=3000
NODE_ENV=production

DATABASE_URL="mysql://root:password@localhost:3306/admin_api"
DATABASE_USER="root"
DATABASE_PASSWORD="password"
DATABASE_NAME="admin_api"
DATABASE_HOST="localhost"
DATABASE_PORT=3306

JWT_SECRET="your_secret_key"
JWT_EXPIRES_IN="7d"
EOF
chmod 600 .env
```

**2. Configure PM2 to start on boot**

Without this step PM2 will not relaunch your processes after a server reboot.

```bash
# Register a systemd unit so PM2 starts at boot
pm2 startup systemd -u root --hp /root
# If pm2 prints a sudo command, copy & run it as instructed.
```

After the PM2 process is started (see below) and confirmed running, save it so PM2 can resurrect it on boot:

```bash
pm2 save
```

`pm2 save` writes the current process list to `/root/.pm2/dump.pm2`, which the systemd unit reads on boot. The deploy workflow re-runs `pm2 save` on every deploy to keep this file in sync.

### First deploy

1. Push to `main`. The workflow rsyncs files, installs dependencies, and runs migrations. The PM2 step prints a warning because no process exists yet — this is expected.
2. Start the process on the server using your process manager (e.g. the 宝塔 PM2 panel) with **process name `server`** and **entry file `dist/server.js`**.
3. (Optional) Seed the default admin account:
   ```bash
   pnpm db:seed:prod
   ```

### Subsequent deploys

Just push to `main`. The workflow installs dependencies, runs migrations, and runs `pm2 restart server`. The process survives both deploys and server reboots.
