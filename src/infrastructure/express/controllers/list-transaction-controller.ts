import type { Request, Response } from 'express';
import { IController } from './icontoller';
import {
  ListTransactionDTO,
  ListTransactionValidation,
} from '../../dtos/list-transaction-dto';
import { ListTransaction } from '../../../application/use-case/list-transaction';
import { errorHandler } from '../middlewares/error-handler';

export class ListTransactionController implements IController {
  constructor(private readonly listTransaction: ListTransaction) {}
  private static readonly PAGE_SIZE = 10;

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const inputRaw: ListTransactionDTO = {
        userId: request.user.id,
        page: Number(request.query.page),
        pageSize: Number(
          request.query.pageSize || ListTransactionController.PAGE_SIZE,
        ),
      };
      const input = ListTransactionValidation.parse(inputRaw);
      const output = await this.listTransaction.execute(input);
      return response.json(output);
    } catch (error) {
      errorHandler(error, request, response);
    }
  }
}
