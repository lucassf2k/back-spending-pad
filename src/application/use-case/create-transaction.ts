import { Transaction } from '../../domain/transaction'
import { CreateTransactionDTO } from '../../infrastructure/dtos/create-transaction-dto'
import { ITransactionRepository } from '../repositories/itransaction-repository'

export class CreateTransaction {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(input: CreateTransactionDTO) {
    const newTransaction = Transaction.create({
      value: input.value,
      title: input.title,
      type: Transaction.getType(input.type),
    })
    return this.transactionRepository.save(input.userId, newTransaction)
  }
}
