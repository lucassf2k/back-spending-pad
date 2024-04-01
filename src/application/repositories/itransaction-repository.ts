import { Transaction } from '../../domain/transaction'

export interface ITransactionRepository {
  save(userId: string, input: Transaction): Promise<Transaction | undefined>
  // update(
  //   id: string,
  //   updatedTransaction: Transaction,
  // ): Promise<Transaction | undefined>
  delete(id: string): Promise<Transaction | undefined>
  get(id: string): Promise<Transaction | undefined>
  getAll(userId): Promise<Transaction[]>
}
