/* eslint-disable @typescript-eslint/no-unused-vars */
import { ZodError } from 'zod'
import type { Request, Response, NextFunction } from 'express'
import { ApiError } from '../../../common/api-error'
import { StatusCode } from '../../../common/status-code'

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next?: NextFunction,
) {
  if (error instanceof ApiError) {
    return response.status(error.code).send({ message: error.message })
  }
  if (error instanceof ZodError) {
    const zodErrors = error.errors.map((err) => err.message)
    return response.status(StatusCode.BAD_REQUEST).send(zodErrors)
  }
  console.log(error)
  return response
    .status(StatusCode.INTERNAL_SERVER_ERROR)
    .end('Internal Server Error')
}
