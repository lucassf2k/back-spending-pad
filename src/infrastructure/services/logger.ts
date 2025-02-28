import pino from 'pino';
import { ENV } from '@/infrastructure/configurations/environments';

const isDevelopment =
  ENV.NODE_ENV === 'development' ? { target: 'pino-pretty' } : undefined;

export const Logger = pino({
  level: ENV.LOG_LEVEL,
  transport: isDevelopment,
});
