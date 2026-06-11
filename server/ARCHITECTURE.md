# Server Architecture (Node.js + Express + TypeScript)

## 1. High-Level Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Clients    │────▶│  API Gateway │────▶│  Express App │
│ (Web/Mobile) │     │ (Nginx/LB)   │     │  (server/)   │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                   │
                ┌──────────────────────────────────┼──────────────────────────────┐
                ▼                                  ▼                              ▼
        ┌───────────────┐                 ┌────────────────┐            ┌────────────────┐
        │  Routes/v1     │                 │  Middlewares   │            │  Background     │
        │  Controllers   │                 │  (auth, rate-  │            │  Jobs/Queues    │
        │  Validators    │                 │  limit, errors)│            │  (BullMQ)       │
        └───────┬────────┘                 └────────────────┘            └────────┬────────┘
                ▼                                                                  ▼
        ┌───────────────┐     ┌────────────────┐     ┌────────────────┐  ┌────────────────┐
        │   Services     │────▶│  Repositories  │────▶│   Prisma ORM   │  │    Redis        │
        │ (business      │     │ (data access)  │     │ (PostgreSQL)   │  │ (cache/queue)   │
        │  logic)        │     └────────────────┘     └────────────────┘  └────────────────┘
        └───────────────┘
```

## 2. Folder Tree

```
server/
├── src/
│   ├── api/
│   │   └── v1/
│   │       ├── auth/
│   │       │   ├── auth.controller.ts
│   │       │   ├── auth.routes.ts
│   │       │   ├── auth.service.ts
│   │       │   ├── auth.validation.ts
│   │       │   └── auth.types.ts
│   │       ├── users/
│   │       │   ├── user.controller.ts
│   │       │   ├── user.routes.ts
│   │       │   ├── user.service.ts
│   │       │   ├── user.repository.ts
│   │       │   ├── user.validation.ts
│   │       │   └── user.types.ts
│   │       └── index.ts            # mounts all v1 routes
│   │
│   ├── config/
│   │   ├── env.ts                  # validated env vars (zod)
│   │   ├── database.ts             # Prisma client init
│   │   ├── redis.ts                # Redis client init
│   │   ├── queue.ts                # BullMQ connection config
│   │   ├── logger.ts               # Winston/Pino setup
│   │   └── swagger.ts              # OpenAPI config
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts      # JWT verification
│   │   ├── rbac.middleware.ts      # role-based access control
│   │   ├── error.middleware.ts     # global error handler
│   │   ├── rateLimiter.middleware.ts
│   │   ├── validate.middleware.ts  # request validation
│   │   └── requestLogger.middleware.ts
│   │
│   ├── common/
│   │   ├── errors/
│   │   │   ├── AppError.ts
│   │   │   ├── NotFoundError.ts
│   │   │   ├── ValidationError.ts
│   │   │   └── UnauthorizedError.ts
│   │   ├── constants/
│   │   │   ├── roles.ts
│   │   │   └── httpStatus.ts
│   │   ├── utils/
│   │   │   ├── asyncHandler.ts
│   │   │   ├── apiResponse.ts
│   │   │   └── pagination.ts
│   │   └── types/
│   │       └── express.d.ts        # extends Request type
│   │
│   ├── database/
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   └── repositories/
│   │       └── base.repository.ts  # generic CRUD repository
│   │
│   ├── jobs/
│   │   ├── queues/
│   │   │   └── email.queue.ts
│   │   ├── workers/
│   │   │   └── email.worker.ts
│   │   └── cron/
│   │       └── cleanup.cron.ts
│   │
│   ├── events/
│   │   ├── eventBus.ts             # in-process emitter or pub/sub
│   │   ├── handlers/
│   │   │   └── userCreated.handler.ts
│   │   └── listeners.ts            # registers all handlers
│   │
│   ├── loaders/
│   │   ├── express.loader.ts       # registers middlewares/routes
│   │   ├── database.loader.ts
│   │   ├── redis.loader.ts
│   │   └── index.ts                # bootstraps everything
│   │
│   ├── docs/
│   │   └── openapi.yaml            # or auto-generated via swagger-jsdoc
│   │
│   ├── app.ts                      # Express app instance (no listen)
│   └── server.ts                   # entry point, calls app.listen
│
├── tests/
│   ├── unit/
│   │   └── users/user.service.test.ts
│   ├── integration/
│   │   └── users/user.routes.test.ts
│   └── e2e/
│       └── auth.e2e.test.ts
│
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── docker-compose.dev.yml
│
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── tsconfig.json
├── package.json
└── README.md
```

## 3. Folder Explanations

### `src/api/v1/<module>/`
- **Purpose**: Feature-based (vertical slice) module containing everything related to one domain (users, auth, orders).
- **Files**: `*.controller.ts` (HTTP layer), `*.routes.ts` (route definitions), `*.service.ts` (business logic), `*.repository.ts` (DB access), `*.validation.ts` (zod/Joi schemas), `*.types.ts` (DTOs/interfaces).
- **Why**: Keeps related code together — easy onboarding, easy to extract into a microservice later.
- **Best practice**: Controllers stay thin (parse request → call service → format response). No business logic in controllers or routes.

### `src/config/`
- **Purpose**: Centralizes all environment-dependent configuration and external client initialization.
- **Files**: `env.ts` validates `process.env` with zod and exports a typed config object; `database.ts`, `redis.ts`, `queue.ts` export singleton clients.
- **Why**: Single source of truth — avoids `process.env.X` scattered across the codebase.
- **Best practice**: Fail fast — throw at startup if required env vars are missing.

### `src/middlewares/`
- **Purpose**: Cross-cutting Express middleware shared across routes.
- **Why**: Auth, RBAC, validation, rate-limiting and error handling apply to many endpoints — defining once avoids duplication.
- **Best practice**: `error.middleware.ts` must be the last middleware registered and catch `AppError` subclasses to return consistent JSON error shapes.

### `src/common/`
- **Purpose**: Shared, domain-agnostic building blocks (errors, constants, utils, shared types).
- **Why**: Prevents circular dependencies between feature modules — common code is the lowest layer.
- **Best practice**: Nothing here should import from `api/`.

### `src/database/`
- **Purpose**: Database abstraction layer.
- **Files**: `prisma/schema.prisma` (models/migrations/seed), `repositories/base.repository.ts` (generic CRUD that feature repos extend).
- **Why**: Decouples services from ORM specifics — swapping Prisma for another ORM only touches this layer.
- **Best practice**: Services never call Prisma directly; always go through a repository.

### `src/jobs/`
- **Purpose**: Background processing.
- **Files**: `queues/` define BullMQ queues, `workers/` process jobs, `cron/` schedules recurring tasks (node-cron).
- **Why**: Keeps slow/async work (emails, reports) off the request/response cycle.
- **Best practice**: Workers run in a separate process/entry point in production for independent scaling.

### `src/events/`
- **Purpose**: Event-driven communication between modules.
- **Files**: `eventBus.ts` (emitter wrapper), `handlers/` (one file per event reaction), `listeners.ts` (wires handlers to events).
- **Why**: Decouples side-effects (e.g., "send welcome email on user created") from core service logic.
- **Best practice**: Handlers should be idempotent and not block the emitting service.

### `src/loaders/`
- **Purpose**: Application bootstrap/composition root.
- **Why**: Separates "wiring everything up" from `app.ts`, keeping startup order explicit and testable.
- **Best practice**: `index.ts` loader is the only place that knows the full startup sequence.

### `src/docs/`
- **Purpose**: OpenAPI/Swagger spec served at `/api-docs`.
- **Best practice**: Generate from JSDoc annotations on routes (`swagger-jsdoc`) or maintain `openapi.yaml` manually for larger teams.

### `tests/`
- **Purpose**: Mirrors `src/` structure split by test type.
- **unit**: mocks repositories, tests service logic in isolation.
- **integration**: spins up Express app + test DB, tests route → DB flow.
- **e2e**: full black-box tests against a running instance (Docker).

### `docker/`
- **Purpose**: Containerization for dev and prod parity.
- **Files**: multi-stage `Dockerfile`, `docker-compose.yml` (app + Postgres + Redis), `docker-compose.dev.yml` (hot-reload overrides).

## 4. Request Flow

```
Request → server.ts → app.ts → loaders (middlewares)
  → rateLimiter → requestLogger → auth.middleware (JWT)
  → rbac.middleware → routes/v1 → validate.middleware
  → controller → service → repository → Prisma → PostgreSQL
  ← response (apiResponse util) ← service ← controller
  → error.middleware (on throw) → JSON error response
```

## 5. Scaling Considerations
- **Stateless app servers**: session/auth state in JWT + Redis, enabling horizontal scaling behind a load balancer.
- **Vertical-slice modules** under `api/v1/<module>/` can be lifted into independent microservices with minimal refactor (each already has its own service/repository/types).
- **Workers separated** from the API process — scale job processing independently.
- **Caching layer (Redis)** for hot reads; **read replicas** for PostgreSQL via Prisma datasource config.
- **API versioning** (`v1`, `v2`) allows breaking changes without disrupting existing clients.

## 6. Enterprise Best Practices
- Strict TypeScript (`strict: true`), path aliases for clean imports.
- Centralized typed env config validated at boot — never read `process.env` elsewhere.
- Consistent API response envelope (`{ success, data, error, meta }`).
- Structured JSON logging (Pino) with request IDs for traceability.
- All errors extend `AppError` with `statusCode` + `isOperational` flag.
- Rate limiting + Helmet + CORS + input sanitization by default.
- 100% of DB access through repositories — no raw Prisma calls in services.
- CI runs lint, typecheck, unit + integration tests, then builds Docker image.

## 7. Common Mistakes to Avoid
- Putting business logic in controllers or routes.
- Importing Prisma client directly inside services/controllers.
- Swallowing errors instead of passing to `next(err)`.
- Hardcoding secrets/config instead of using validated `env.ts`.
- Mixing unrelated domain logic into `common/` (it should stay generic).
- Running cron jobs/workers inside the same process as the API server in production.
- Skipping API versioning from day one (hard to retrofit later).
