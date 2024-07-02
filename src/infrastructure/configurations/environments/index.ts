import { randomBytes } from 'node:crypto';

const APP_PORT = Number(process.env.APP_PORT) || 3001;
const RANDOM_BYTES = randomBytes(20).toString('hex');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || RANDOM_BYTES;
export const ENV = Object.freeze({
  APP_PORT,
  JWT_SECRET_KEY,
});
