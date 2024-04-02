import type { Request, Response } from 'express'
import { IController } from './icontoller'
import { CreateUserValidation } from '../../dtos/create-user-dto'
import { CreateUser } from '../../../application/use-case/create-user'
import { errorHandler } from '../middlewares/error-handler'

export class CreateUserController implements IController {
  constructor(private readonly createUser: CreateUser) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = CreateUserValidation.parse(request.body)
      const user = await this.createUser.execute(input)
      const url = `${request.url}/${user._id}`
      return response.location(url).send()
    } catch (error) {
      errorHandler(error, request, response)
    }
  }
}
