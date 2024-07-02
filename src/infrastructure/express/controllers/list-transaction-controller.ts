import type { Request, Response } from 'express';
import { IController } from './icontoller';
import { ListTransactionValidation } from '../../dtos/list-transaction-dto';
import { ListTransaction } from '../../../application/use-case/list-transaction';
import { errorHandler } from '../middlewares/error-handler';

export class ListTransactionController implements IController {
  constructor(private readonly listTransaction: ListTransaction) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = ListTransactionValidation.parse(request.user.id);
      const output = await this.listTransaction.execute(input);
      return response.json(output);
    } catch (error) {
      errorHandler(error, request, response);
    }
  }
}
