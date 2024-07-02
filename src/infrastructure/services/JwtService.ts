/* eslint-disable @typescript-eslint/no-explicit-any */
import JWT from 'jsonwebtoken';

export type UserPayload = {
  id: string;
  email: string;
};

export class JwtService {
  private constructor() {}

  static sign(
    payload: object | string,
    secret: string,
    expiresIn: number | string,
  ) {
    return JWT.sign(payload, secret, { expiresIn });
  }

  static verify(token: string, secret: string) {
    return JWT.verify(token, secret);
  }
}
