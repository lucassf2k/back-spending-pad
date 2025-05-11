import { Transaction } from '@/domain/transaction';
import { delay } from '@/infrastructure/repositories/in-memories/delay';
import { ITransactionRepository } from '@/application/repositories/itransaction-repository';

export class InMemoriesTransactionsRepository
  implements ITransactionRepository
{
  private readonly db: { data: Transaction; userId: string }[];

  constructor() {
    this.db = [] as { data: Transaction; userId: string }[];
  }
  async save(
    userId: string,
    input: Transaction,
  ): Promise<Transaction | undefined> {
    const transaction = Transaction.restore(input._id, {
      ...input.props,
      createdAt: input.props.createdAt ?? new Date(),
      updatedAt: input.props.updatedAt ?? new Date(),
    });
    this.db.push({ data: transaction, userId });
    await delay(500);
    return new Promise((resolve) => resolve(transaction));
  }
  async update(
    updatedTransaction: Transaction,
  ): Promise<Transaction | undefined> {
    const transaction = this.db.find(
      (transaction) => transaction.data._id === updatedTransaction._id,
    );
    if (!transaction) return undefined;
    transaction.data.props.title = updatedTransaction.props.title;
    transaction.data.props.value = updatedTransaction.props.value;
    transaction.data.props.type = updatedTransaction.props.type;
    transaction.data.props.updatedAt = updatedTransaction.props.updatedAt;
    await delay(500);
    return new Promise((resolve) => resolve(transaction.data));
  }
  async delete(id: string): Promise<Transaction | undefined> {
    const transaction = this.db.find(
      (transaction) => transaction.data._id === id,
    );
    if (!transaction) return undefined;
    this.db.splice(this.db.indexOf(transaction), 1);
    await delay(500);
    return new Promise((resolve) => resolve(transaction.data));
  }
  async get(id: string): Promise<Transaction | undefined> {
    const transaction = this.db.find(
      (transaction) => transaction.data._id === id,
    );
    if (!transaction) return undefined;
    await delay(500);
    return new Promise((resolve) => resolve(transaction.data));
  }
  async getAll(
    userId: string,
    skip: number,
    take: number,
  ): Promise<Transaction[]> {
    const allTransactions = this.db
      .filter((transaction) => transaction.userId === userId)
      .slice(skip, skip + take);
    delay(500);
    return new Promise((resolve) =>
      resolve(allTransactions.map((t) => t.data)),
    );
  }
}
