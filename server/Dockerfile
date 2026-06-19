# ── Stage 1: Build server ─────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

# ── Stage 2: Production runner ────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/database/prisma ./src/database/prisma
COPY --from=builder /app/package.json ./

EXPOSE 4000

CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy && node dist/server.js"]
