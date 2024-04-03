import { Transaction } from '../../domain/transaction'
import { ITransactionRepository } from '../repositories/itransaction-repository'
import { GetTransactionDTO } from '../../infrastructure/dtos/get-transaction-dto'

export class GetTransaction {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(input: GetTransactionDTO) {
    const transaction = await this.transactionRepository.get(input.id)
    if (!transaction) return undefined
    return GetTransaction.output(transaction)
  }

  static output(input: Transaction) {
    return {
      id: input._id,
      title: input.props.title,
      value: input.props.value,
      type: Transaction.typeFromStringToBoolean(input.props.type),
      createdAt: input.props.createdAt,
      updatedAt: input.props.updatedAt,
    }
  }
}
