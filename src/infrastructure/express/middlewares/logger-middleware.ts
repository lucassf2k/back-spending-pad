import { Logger } from '@/infrastructure/services/logger';
import pinoHttp from 'pino-http';

export const loggerMiddleware = pinoHttp({ logger: Logger });
