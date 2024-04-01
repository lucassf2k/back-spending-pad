import type { Request, Response } from 'express'
import { IController } from './icontoller'
import { StatusCode } from '../../../common/status-code'
import { CreateTransaction } from '../../../application/use-case/create-transaction'
import { CreateTransactionValidation } from '../../dtos/create-transaction-dto'

export class CreateTransactionController implements IController {
  constructor(private readonly createTransaction: CreateTransaction) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const input = CreateTransactionValidation.parse(request)
    const output = await this.createTransaction.execute(input)
    if (!output) throw new Error('Erro ao inserir no banco de dados')
    return response.status(StatusCode.CREATED).json({ id: output._id })
  }
}
