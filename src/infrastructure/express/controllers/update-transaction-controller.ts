import type { Request, Response } from 'express'
import { IController } from './icontoller'
import { errorHandler } from '../middlewares/error-handler'
import { UpdateTransactionValidation } from '../../dtos/update-transaction-dto'
import { UpdateTransaction } from '../../../application/use-case/update-transaction'

export class UpdateTransactionController implements IController {
  constructor(private readonly updateTransaction: UpdateTransaction) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = UpdateTransactionValidation.parse(request)
      const transaction = await this.updateTransaction.execute(input)
      return response.json(transaction)
    } catch (error) {
      errorHandler(error, request, response)
    }
  }
}
