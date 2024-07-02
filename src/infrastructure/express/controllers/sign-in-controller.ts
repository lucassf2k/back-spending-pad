import type { Request, Response } from 'express';
import { IController } from './icontoller';
import { SignInValidation } from '../../dtos/sign-in-dto';
import { errorHandler } from '../middlewares/error-handler';
import { SignIn } from '../../../application/use-case/sign-in';

export class SignInController implements IController {
  constructor(private readonly signIn: SignIn) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = SignInValidation.parse(request.body);
      const { token } = await this.signIn.execute(input);
      return response.json({ token });
    } catch (error) {
      errorHandler(error, request, response);
    }
  }
}
