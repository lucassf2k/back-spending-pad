/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { StatusCode } from '@/common/status-code';
import { AuthorizationValidation } from '@/infrastructure/express/middlewares/validations';
import { JwtService } from '@/infrastructure/services/JwtService';
import { errorHandler } from '@/infrastructure/express/middlewares/error-handler';
import { ApiError } from '@/common/api-error';
import { ENV } from '@/infrastructure/configurations/environments';
import { Logger } from '@/infrastructure/services/logger';

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
    Logger.info('starting authenticationMiddleware');
    const { authorization } = request.headers;
    Logger.info(`getting authorization from request.headers`);
    Logger.debug(
      `calling AuthorizationValidation.parse. Input: ${authorization}`,
    );
    const input = AuthorizationValidation.parse(authorization);
    Logger.info('authorization formatted correctly');
    const [_, token] = input.split(' ');
    Logger.debug(
      `calling JwtService.verify. Input: ${token} and ${ENV.JWT_SECRET_KEY}`,
    );
    const payload = JwtService.verify(token, ENV.JWT_SECRET_KEY) as JwTPayload;
    Logger.info('token validated');
    Logger.info('checking payload');
    if (!payload.user.id) {
      Logger.info('payload does not exist');
      Logger.warn(new ApiError('Unauthorized user', StatusCode.UNAUTHORIZED));
      throw new ApiError('Unauthorized user', StatusCode.UNAUTHORIZED);
    }
    Logger.info('payload informed correctly');
    Logger.debug(`Payload: ${payload}`);
    request.user = payload.user;
    return next();
  } catch (error) {
    if (error instanceof JWT.JsonWebTokenError) {
      Logger.info('JsonWebTokenError instance error');
      Logger.debug(error);
      return response
        .status(StatusCode.UNAUTHORIZED)
        .json({ error: error.message });
    }
    errorHandler(error, request, response);
  }
}
