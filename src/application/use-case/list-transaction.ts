import { Transaction } from '../../domain/transaction'
import { ListTransactionDTO } from '../../infrastructure/dtos/list-transaction-dto'
import { ITransactionRepository } from '../repositories/itransaction-repository'

export class ListTransaction {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(input: ListTransactionDTO): Promise<Transaction[]> {
    return this.transactionRepository.getAll(input.id)
  }
}
