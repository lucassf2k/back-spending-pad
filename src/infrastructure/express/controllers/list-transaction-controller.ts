import type { Request, Response } from 'express'
import { IController } from './icontoller'
import { ListTransactionValidation } from '../../dtos/list-transaction-dto'
import { ListTransaction } from '../../../application/use-case/list-transaction'
import { ApiError } from '../../../common/api-error'
import { StatusCode } from '../../../common/status-code'

export class ListTransactionController implements IController {
  constructor(private readonly listTransaction: ListTransaction) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = ListTransactionValidation.parse(request.params)
    const output = await this.listTransaction.execute(input)
    if (!output)
      throw new ApiError('transação não encontrada', StatusCode.NOT_FOUND)
    return response.json(output)
  }
}
