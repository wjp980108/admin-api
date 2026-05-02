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

**1. Upload the following files to the server**

```
dist               # Compiled output
prisma             # Schema and migration files
prisma.config.ts   # Prisma CLI configuration
package.json
```

**2. Run on the server**

```bash
# Install dependencies
pnpm install

# Create and configure environment variables (only needed once)
cp .env.example .env
# Edit .env with production settings, make sure NODE_ENV=production

# Run database migrations
pnpm db:prod

# Seed default admin account (only needed once)
pnpm db:seed:prod

# Start the server
pnpm start
``````
