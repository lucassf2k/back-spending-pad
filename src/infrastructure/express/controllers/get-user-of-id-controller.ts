import type { Request, Response } from 'express';
import { IController } from '@/infrastructure/express/controllers/icontoller';
import { GetUserOfId } from '@/application/use-case/get-user-of-id';
import { GetUserOfIdValidation } from '@/infrastructure/dtos/get-user-dto';
import { ApiError } from '@/common/api-error';
import { StatusCode } from '@/common/status-code';
import { errorHandler } from '@/infrastructure/express/middlewares/error-handler';

export class GetUserOfIdController implements IController {
  constructor(private readonly getUserOfId: GetUserOfId) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = GetUserOfIdValidation.parse(request.params);
      const user = await this.getUserOfId.execute(input);
      if (!user) {
        throw new ApiError('User not found', StatusCode.NOT_FOUND);
      }
      return response.json(user);
    } catch (error) {
      errorHandler(error, request, response);
    }
  }
}
