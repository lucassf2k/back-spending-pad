import type { Request, Response } from 'express';
import { IController } from './icontoller';
import { errorHandler } from '../middlewares/error-handler';
import { DeleteTransactionValidation } from '../../dtos/delete-transaction-dto';
import { DeleteTransaction } from '../../../application/use-case/delete-transaction';

export class DeleteTransactionController implements IController {
  constructor(private readonly deleteTransaction: DeleteTransaction) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = DeleteTransactionValidation.parse(request.params);
      const transaction = await this.deleteTransaction.execute(input);
      return response.json({ id: transaction._id });
    } catch (error) {
      errorHandler(error, request, response);
    }
  }
}
