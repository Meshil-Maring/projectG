# Stage 1: Build React app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Stage 2: Serve with a minimal Express server (guarantees SPA fallback)
FROM node:20-alpine AS runner

WORKDIR /app

RUN npm init -y && npm install express

COPY server.js .
COPY --from=builder /app/dist ./dist

EXPOSE 10000

CMD ["node", "server.js"]
