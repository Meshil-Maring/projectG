# ── Stage 1: Build React client ───────────────────────────────────────────────
FROM node:20-alpine AS client-builder
WORKDIR /client

COPY client/package.json client/package-lock.json ./
RUN npm ci

COPY client/ .

ARG VITE_API_URL=/api/v1
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ── Stage 2: Build Express server ─────────────────────────────────────────────
FROM node:20-alpine AS server-builder
WORKDIR /app

COPY server/package.json server/package-lock.json ./
RUN npm ci

COPY server/ .
RUN npx prisma generate
RUN npm run build

# ── Stage 3: Production runner ────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=server-builder /app/node_modules ./node_modules
COPY --from=server-builder /app/dist ./dist
COPY --from=server-builder /app/src/database/prisma ./src/database/prisma
COPY --from=server-builder /app/package.json ./

# React build at /app/client-dist — app.ts resolves it via __dirname/../client-dist
COPY --from=client-builder /client/dist ./client-dist

EXPOSE 4000

CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy && node dist/server.js"]
