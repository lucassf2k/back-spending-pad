import { PrismaClient } from '@prisma/client';
import { Transaction } from '../../../domain/transaction';
import { prismaClient } from '.';
import { ITransactionRepository } from '../../../application/repositories/itransaction-repository';

export class PrismaTransactionRepository implements ITransactionRepository {
  private readonly prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = prismaClient;
  }

  async save(userId: string, input: Transaction): Promise<Transaction> {
    const createdTransaction = await this.prismaClient.transaction.create({
      data: {
        id: input._id,
        title: input.props.title,
        type: input.props.type,
        value: input.props.value,
        user_id: userId,
      },
    });
    if (!createdTransaction) return undefined;
    return Transaction.restore(createdTransaction.id, {
      title: createdTransaction.title,
      type: Transaction.getType(createdTransaction.type),
      value: createdTransaction.value,
      createdAt: createdTransaction.created_at,
      updatedAt: createdTransaction.updated_at,
    });
  }

  async update(updatedTransaction: Transaction): Promise<Transaction> {
    const transaction = await this.prismaClient.transaction.update({
      where: { id: updatedTransaction._id },
      data: {
        title: updatedTransaction.props.title,
        value: updatedTransaction.props.value,
        type: updatedTransaction.props.type,
      },
    });
    if (!transaction) return undefined;
    return Transaction.restore(transaction.id, {
      title: transaction.title,
      type: Transaction.getType(transaction.type),
      value: transaction.value,
      createdAt: transaction.created_at,
      updatedAt: transaction.updated_at,
    });
  }

  async delete(id: string): Promise<Transaction> {
    const transaction = await this.prismaClient.transaction.delete({
      where: { id },
    });
    if (!transaction) return undefined;
    return Transaction.restore(transaction.id, {
      title: transaction.title,
      type: Transaction.getType(transaction.type),
      value: transaction.value,
      createdAt: transaction.created_at,
      updatedAt: transaction.updated_at,
    });
  }

  async get(id: string): Promise<Transaction> {
    const transaction = await this.prismaClient.transaction.findFirst({
      where: { id },
    });
    if (!transaction) return undefined;
    return Transaction.restore(transaction.id, {
      title: transaction.title,
      type: Transaction.getType(transaction.type),
      value: transaction.value,
      createdAt: transaction.created_at,
      updatedAt: transaction.updated_at,
    });
  }

  async getAll(
    userId: string,
    skip: number,
    take: number,
  ): Promise<Transaction[]> {
    const transactions = await this.prismaClient.transaction.findMany({
      skip,
      take,
      where: { user_id: userId },
    });
    if (transactions.length === 0) return [];
    const output: Transaction[] = [];
    for (const transaction of transactions) {
      output.push(
        Transaction.restore(transaction.id, {
          title: transaction.title,
          type: Transaction.getType(transaction.type),
          value: transaction.value,
          createdAt: transaction.created_at,
          updatedAt: transaction.updated_at,
        }),
      );
    }
    return output;
  }
}
