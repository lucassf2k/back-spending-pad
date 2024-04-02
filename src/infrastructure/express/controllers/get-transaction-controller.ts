import type { Request, Response } from 'express'
import { IController } from './icontoller'
import { GetTransactionValidation } from '../../dtos/get-transaction-dto'
import { GetTransaction } from '../../../application/use-case/get-transaction'
import { StatusCode } from '../../../common/status-code'
import { ApiError } from '../../../common/api-error'
import { errorHandler } from '../middlewares/error-handler'

export class GetTransactionController implements IController {
  constructor(private readonly getTransaction: GetTransaction) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = GetTransactionValidation.parse(request.params)
      const transaction = await this.getTransaction.execute(input)
      if (!transaction) {
        throw new ApiError('transação não encontrada', StatusCode.NOT_FOUND)
      }
      return response.json(transaction)
    } catch (error) {
      errorHandler(error, request, response)
    }
  }
}
