import type { Request, Response } from 'express';
import { IController } from '@/infrastructure/express/controllers/icontoller';
import { CreateUserValidation } from '@/infrastructure/dtos/create-user-dto';
import { CreateUser } from '@/application/use-case/create-user';
import { errorHandler } from '@/infrastructure/express/middlewares/error-handler';

export class CreateUserController implements IController {
  constructor(private readonly createUser: CreateUser) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = CreateUserValidation.parse(request.body);
      const user = await this.createUser.execute(input);
      const url = `${request.baseUrl}/${user._id}`;
      return response.location(url).send({ id: user._id });
    } catch (error) {
      errorHandler(error, request, response);
    }
  }
}
