import { PrismaClient } from '@prisma/client'
import { Transaction } from '../../../domain/transaction'
import { ITransactionRepository } from '../../../application/repositories/itransaction-repository'

export class PrismaTransactionRepository implements ITransactionRepository {
  private readonly prismaClient = new PrismaClient()

  async save(userId: string, input: Transaction): Promise<Transaction> {
    const createdTransaction = await this.prismaClient.transaction.create({
      data: {
        id: input._id,
        title: input.props.title,
        type: input.props.type,
        value: input.props.value,
        user_id: userId,
      },
    })
    if (!createdTransaction) return undefined
    return Transaction.restore(createdTransaction.id, {
      title: createdTransaction.title,
      type: Transaction.getType(createdTransaction.type),
      value: createdTransaction.value,
    })
  }

  // async update(
  //   id: string,
  //   updatedTransaction: Transaction,
  // ): Promise<Transaction> {
  //   throw new Error('Method not implemented.')
  // }

  async delete(id: string): Promise<Transaction> {
    const transaction = await this.prismaClient.transaction.delete({
      where: { id },
    })
    if (!transaction) return undefined
    return Transaction.restore(transaction.id, {
      title: transaction.title,
      type: Transaction.getType(transaction.type),
      value: transaction.value,
    })
  }

  async get(id: string): Promise<Transaction> {
    const transaction = await this.prismaClient.transaction.findFirst({
      where: { id },
    })
    if (!transaction) return undefined
    return Transaction.restore(transaction.id, {
      title: transaction.title,
      type: Transaction.getType(transaction.type),
      value: transaction.value,
    })
  }

  async getAll(userId: string): Promise<Transaction[]> {
    const transactions = await this.prismaClient.transaction.findMany({
      where: { user_id: userId },
    })
    if (transactions.length === 0) return []
    const output: Transaction[] = []
    for (const transaction of transactions) {
      output.push(
        Transaction.restore(transaction.id, {
          title: transaction.title,
          type: Transaction.getType(transaction.type),
          value: transaction.value,
        }),
      )
    }
    return output
  }
}
