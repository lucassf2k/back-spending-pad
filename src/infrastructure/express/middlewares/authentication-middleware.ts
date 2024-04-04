/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Request, Response, NextFunction } from 'express'
import { StatusCode } from '../../../common/status-code'
import { AuthorizationValidation } from './validations'
import { JwtService } from '../../services/JwtService'
import { errorHandler } from './error-handler'
import { ApiError } from '../../../common/api-error'

type JwTPayload = {
  id: string
  email: string
}

export function authenticationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { authorization } = request.headers
    const input = AuthorizationValidation.parse(authorization)
    const [_, token] = input.split(' ')
    const payload: JwTPayload = JwtService.verify(token, 'asdaddjajndjanda')
    if (!payload.id) {
      throw new ApiError('Usuário sem permisão', StatusCode.UNAUTHORIZED)
    }
    request.user = payload
    return next()
  } catch (error) {
    errorHandler(error, request, response)
  }
}
