import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { v1Routes } from './api/v1/index.js';
import { apiLimiter } from './middlewares/rateLimiter.middleware.js';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';

export const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(helmet());
app.use(cors({ origin: env.corsOrigins, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(pinoHttp({ logger, autoLogging: !env.isDev }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.use('/api/v1', apiLimiter, v1Routes);

// Serve the React client build — /api/v1 takes priority above
const clientDist = path.resolve(__dirname, '../client-dist');
app.use(express.static(clientDist));
app.get('/{*splat}', (_req, res, next) => {
  res.sendFile(path.join(clientDist, 'index.html'), (err) => {
    if (err) next(); // fall through to notFoundHandler in dev (no client build)
  });
});

app.use(notFoundHandler);
app.use(errorHandler);
