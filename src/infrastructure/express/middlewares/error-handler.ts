/* eslint-disable @typescript-eslint/no-unused-vars */
import { ZodError } from 'zod';
import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/common/api-error';
import { StatusCode } from '@/common/status-code';
import { Logger } from '@/infrastructure/services/logger';

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next?: NextFunction,
) {
  Logger.info('starting error handler');
  if (error instanceof ApiError) {
    Logger.info('ApiError instance error');
    Logger.warn(`ApiError: ${error}`);
    return response.status(error.code).json({ error: error.message });
  }
  if (error instanceof ZodError) {
    Logger.info('ZodError instance error');
    Logger.warn(`ZodError: ${error}`);
    const errors = error.errors.map((err) => err.message);
    return response
      .status(StatusCode.BAD_REQUEST)
      .json({ validationErrors: errors });
  }
  Logger.error(`UncapturedErrors: ${error}`);
  return response
    .status(StatusCode.INTERNAL_SERVER_ERROR)
    .end('Internal Server Error');
}
