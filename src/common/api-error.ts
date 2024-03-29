import { StatusCode } from './status-code'

export class ApiError extends Error {
  readonly code: StatusCode

  constructor(message: string, statusCode: StatusCode) {
    super()
    this.message = message
    this.code = statusCode
  }
}
