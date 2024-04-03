import type { Request, Response } from 'express'
import { IController } from './icontoller'
import { DeleteTransaction } from '../../../application/use-case/delete-transaction'
import { DeleteTransactionValidation } from '../../dtos/delete-transaction-dto'
import { ApiError } from '../../../common/api-error'
import { StatusCode } from '../../../common/status-code'
import { errorHandler } from '../middlewares/error-handler'

export class DeleteTransactionController implements IController {
  constructor(private readonly deleteTransaction: DeleteTransaction) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = DeleteTransactionValidation.parse(request.params)
      const transaction = await this.deleteTransaction.execute(input)
      if (!transaction) {
        throw new ApiError('transação não encontrada', StatusCode.NOT_FOUND)
      }
      return response.json({ id: transaction._id })
    } catch (error) {
      errorHandler(error, request, response)
    }
  }
}
