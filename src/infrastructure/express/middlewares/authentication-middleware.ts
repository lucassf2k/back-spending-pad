/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../../../common/status-code';
import { AuthorizationValidation } from './validations';
import { JwtService } from '../../services/JwtService';
import { errorHandler } from './error-handler';
import { ApiError } from '../../../common/api-error';
import { ENV } from '../../configurations/environments';
import JWT from 'jsonwebtoken';

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
      throw new ApiError('Usuário sem permisão', StatusCode.UNAUTHORIZED);
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
