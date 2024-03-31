import { Transaction } from '../../domain/transaction'

export interface ITransactionRepository {
  save(input: Transaction): Promise<Transaction | undefined>
  update(
    id: string,
    updatedTransaction: Transaction,
  ): Promise<Transaction | undefined>
  delete(id: string): Promise<Transaction | undefined>
  get(id: string): Promise<Transaction | undefined>
}
