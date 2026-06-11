# ProjectG Server

Node.js + Express 5 + TypeScript + Prisma (PostgreSQL) backend. See [ARCHITECTURE.md](ARCHITECTURE.md) for the full design.

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Start PostgreSQL (Docker)
docker compose -f docker/docker-compose.dev.yml up -d

# 3. Configure environment
copy .env.example .env   # then edit JWT_SECRET

# 4. Create database schema + seed admin user
npm run prisma:migrate
npm run prisma:seed      # admin@projectg.org / ChangeMe123!

# 5. Run dev server (http://localhost:4000)
npm run dev
```

## Endpoints (v1)

| Method | Path                | Auth        | Description           |
| ------ | ------------------- | ----------- | --------------------- |
| GET    | `/health`           | —           | Health check          |
| POST   | `/api/v1/auth/login`| —           | Login → JWT           |
| GET    | `/api/v1/auth/me`   | Bearer      | Current user          |
| GET    | `/api/v1/users`     | Bearer ADMIN| List users            |
| POST   | `/api/v1/users`     | Bearer ADMIN| Create user           |
| GET    | `/api/v1/users/:id` | Bearer ADMIN| Get user              |
| PATCH  | `/api/v1/users/:id` | Bearer ADMIN| Update user           |
| DELETE | `/api/v1/users/:id` | Bearer ADMIN| Delete user           |

Responses use the envelope `{ success, data }` on success and `{ success: false, error: { message, details? } }` on failure.

## Scripts

- `npm run dev` — tsx watch mode
- `npm run build` / `npm start` — production build + run
- `npm run typecheck` — TypeScript check only
- `npm run prisma:migrate` — create/apply dev migrations
- `npm run prisma:seed` — seed admin user (override with `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`)
