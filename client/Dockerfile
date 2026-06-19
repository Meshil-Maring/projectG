# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# VITE_API_URL is baked into the JS bundle at build time
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Stage 2: Serve with `serve` (SPA mode handles client-side routing on refresh)
FROM node:20-alpine AS runner

RUN npm install -g serve

COPY --from=builder /app/dist /app/dist

WORKDIR /app

EXPOSE 10000

CMD ["serve", "-s", "dist", "-l", "10000"]
