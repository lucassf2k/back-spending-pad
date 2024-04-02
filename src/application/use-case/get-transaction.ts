import { Transaction } from '../../domain/transaction'
import { ITransactionRepository } from '../repositories/itransaction-repository'
import { GetTransactionDTO } from '../../infrastructure/dtos/get-transaction-dto'

export class GetTransaction {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(input: GetTransactionDTO) {
    const transaction = await this.transactionRepository.get(input.id)
    return GetTransaction.output(transaction)
  }

  static output(input: Transaction) {
    return {
      id: input._id,
      title: input.props.titile,
      value: input.props.value,
      type: Transaction.typeFromStringToBoolean(input.props.type),
      description: input.props.description,
    }
  }
}
