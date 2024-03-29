import type { Request, Response } from 'express'
import { IController } from './icontoller'
import { CreateUserValidation } from '../../dtos/create-user-dto'
import { CreateUser } from '../../../application/use-case/create-user'

export class CreateUserController implements IController {
  constructor(private readonly createUser: CreateUser) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = CreateUserValidation.parse(request.body)
    const user = await this.createUser.execute(input)
    const url = `${request.url}/${user.id}`
    return response.setHeader('location', url)
  }
}
