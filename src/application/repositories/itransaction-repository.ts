import { Transaction } from '../../domain/transaction';

export interface ITransactionRepository {
  save(userId: string, input: Transaction): Promise<Transaction | undefined>;
  update(updatedTransaction: Transaction): Promise<Transaction | undefined>;
  delete(id: string): Promise<Transaction | undefined>;
  get(id: string): Promise<Transaction | undefined>;
  getAll(userId: string, skip: number, take: number): Promise<Transaction[]>;
}
