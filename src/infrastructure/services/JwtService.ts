/* eslint-disable @typescript-eslint/no-explicit-any */
import JWT from 'jsonwebtoken';
const { sign, verify } = JWT;

export type UserPayload = {
  id: string;
  email: string;
};

export const JwtService = Object.freeze({
  sign,
  verify,
});
