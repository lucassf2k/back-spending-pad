import type { Request, Response } from 'express';
import { IController } from './icontoller';
import { StatusCode } from '../../../common/status-code';
import { CreateTransaction } from '../../../application/use-case/create-transaction';
import { CreateTransactionValidation } from '../../dtos/create-transaction-dto';
import { errorHandler } from '../middlewares/error-handler';

export class CreateTransactionController implements IController {
  constructor(private readonly createTransaction: CreateTransaction) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const validRequest = CreateTransactionValidation.parse(request.body);
      const input = {
        userId: request.user.id,
        ...validRequest,
      };
      const output = await this.createTransaction.execute(input);
      if (!output) throw new Error('Erro ao inserir no banco de dados');
      return response.status(StatusCode.CREATED).json({ id: output._id });
    } catch (error) {
      errorHandler(error, request, response);
    }
  }
}
