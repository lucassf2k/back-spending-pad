import type { Request, Response } from 'express'
import { IController } from './icontoller'
import { errorHandler } from '../middlewares/error-handler'
import { GetTransactionValidation } from '../../dtos/get-transaction-dto'
import { GetTransaction } from '../../../application/use-case/get-transaction'

export class GetTransactionController implements IController {
  constructor(private readonly getTransaction: GetTransaction) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = GetTransactionValidation.parse(request.params)
      const transaction = await this.getTransaction.execute(input)
      return response.json(transaction)
    } catch (error) {
      errorHandler(error, request, response)
    }
  }
}
