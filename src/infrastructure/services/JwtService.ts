/* eslint-disable @typescript-eslint/no-explicit-any */
import { sign, verify } from 'jsonwebtoken';

export type UserPayload = {
  id: string;
  email: string;
};

export const JwtService = Object.freeze({
  sign,
  verify,
});
