import 'dotenv/config';
import { z } from 'zod';

const EnvSchema = z.object({
  APP_PORT: z.coerce.number().min(1),
  JWT_SECRET_KEY: z.coerce.string().min(30),
  API_VERSION: z.literal('v1'),
  LOG_LEVEL: z.union([z.literal('info'), z.literal('debug')]).default('info'),
  NODE_ENV: z
    .union([z.literal('development'), z.literal('production')])
    .default('development'),
});

export const ENV = EnvSchema.parse(process.env);
