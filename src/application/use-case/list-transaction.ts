import { Transaction } from '../../domain/transaction'
import { ListTransactionDTO } from '../../infrastructure/dtos/list-transaction-dto'
import { ITransactionRepository } from '../repositories/itransaction-repository'

export class ListTransaction {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(input: ListTransactionDTO) {
    const transactions = await this.transactionRepository.getAll(input.id)
    return ListTransaction.output(transactions)
  }

  static output(transactions: Transaction[]) {
    return transactions.map((transaction) => ({
      id: transaction._id,
      title: transaction.props.titile,
      value: transaction.props.value,
      type: Transaction.typeFromStringToBoolean(transaction.props.type),
      description: transaction.props.description,
    }))
  }
}
