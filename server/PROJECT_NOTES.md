# Project Understanding Notes — ProjectG

## Context
Before starting backend work, document the current project structure and idea so future work (especially building out `server/`) is grounded in the actual frontend it must support.

## Project Idea
ProjectG is a marketing/engagement website for a non-profit/social impact organization with 5 charitable groups:
- Legal Aid Club (LAC)
- Work for Humanity Group (WHG)
- Human Resources Developmental Society (HRDS)
- Foundation for Socio-Economic Development Society (FSEDS)
- Competitive World Group (CWG)

Site enables donations, volunteering, impact tracking, and has a basic admin dashboard (currently localStorage-based auth, no real backend yet).

## Current Structure
```
projectG/
├── client/              # React 19 + Vite + TS frontend
│   ├── src/
│   │   ├── components/  # user/admin + feature folders (about-us, lac, etc.)
│   │   ├── pages/        # route pages
│   │   ├── context/       # React Context providers (e.g. AboutUsContext)
│   │   ├── data/           # static data (causes, stories, groups)
│   │   ├── assets/
│   │   └── shared/         # Navbar, Footer
│   └── public/
├── server/              # Backend - architecture documented, NOT implemented
│   └── ARCHITECTURE.md  # Node.js/Express/Prisma/Postgres/Redis blueprint
└── docker-compose.yml
```

## Routes (Client)
**Public:** `/`, `/about-us`, `/stories`, `/notice`, `/causes`, `/contact`, `/get-involved`, `/donate`, `/impact`, `/lac`, `/whg`, `/hrds`, `/cwg`, `/fseds`, `/groups/:slug`
**Admin:** `/projectG-admin` (login), `/projectG-admin/dashboard` (localStorage auth)

## Tech Stack
- React 19, Vite, TypeScript (strict), React Router 7, Tailwind CSS 4, Framer Motion, Lucide icons, qrcode.react
- No state lib — Context API only
- Docker + docker-compose for client
- Backend planned: Node.js + Express + TypeScript + Prisma + PostgreSQL + Redis + JWT/RBAC (per server/ARCHITECTURE.md, not yet implemented)

## Status
- Core backend scaffolded (2026-06-11): Express 5 + TS strict + Prisma/Postgres + JWT auth + RBAC
- Implemented: config (zod-validated env, pino logger), error/auth/rbac/validate/rate-limit middlewares, `auth` module (login, me), `users` module (admin CRUD), Prisma User model + seed, dev docker-compose for Postgres
- Deferred from ARCHITECTURE.md until needed: Redis, BullMQ jobs/workers, events, loaders, swagger, tests
- Verified: typecheck passes, server boots, /health responds, validation returns 422 envelopes
- NOT yet done (docker unavailable in dev shell): start Postgres, `prisma migrate dev`, seed, end-to-end login test

## Next Step
- Run DB setup (see README quick start), then wire client admin login to `POST /api/v1/auth/login`
- Then: content modules (causes/stories/groups), donation + volunteer submission endpoints
