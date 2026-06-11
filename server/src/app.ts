import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { v1Routes } from './api/v1/index.js';
import { apiLimiter } from './middlewares/rateLimiter.middleware.js';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware.js';

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigins, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(pinoHttp({ logger, autoLogging: !env.isDev }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.use('/api/v1', apiLimiter, v1Routes);

app.use(notFoundHandler);
app.use(errorHandler);
