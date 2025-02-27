/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { StatusCode } from '@/common/status-code';
import { AuthorizationValidation } from '@/infrastructure/express/middlewares/validations';
import { JwtService } from '@/infrastructure/services/JwtService';
import { errorHandler } from '@/infrastructure/express/middlewares/error-handler';
import { ApiError } from '@/common/api-error';
import { ENV } from '@/infrastructure/configurations/environments';

type JwTPayload = {
  user: {
    id: string;
    email: string;
  };
  iat: number;
  exp: number;
};

export function authenticationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { authorization } = request.headers;
    const input = AuthorizationValidation.parse(authorization);
    const [_, token] = input.split(' ');
    const payload = JwtService.verify(token, ENV.JWT_SECRET_KEY) as JwTPayload;
    if (!payload.user.id) {
      throw new ApiError('Unauthorized user', StatusCode.UNAUTHORIZED);
    }
    request.user = payload.user;
    return next();
  } catch (error) {
    if (error instanceof JWT.JsonWebTokenError) {
      return response
        .status(StatusCode.UNAUTHORIZED)
        .json({ error: error.message });
    }
    errorHandler(error, request, response);
  }
}
