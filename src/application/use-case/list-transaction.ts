import { Transaction } from '@/domain/transaction';
import { ListTransactionDTO } from '@/infrastructure/dtos/list-transaction-dto';
import { ITransactionRepository } from '@/application/repositories/itransaction-repository';

export class ListTransaction {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(input: ListTransactionDTO) {
    const skip = (input.page - 1) * input.pageSize;
    const transactions = await this.transactionRepository.getAll(
      input.userId,
      skip,
      input.pageSize,
    );
    return ListTransaction.output(transactions);
  }

  static output(transactions: Transaction[]) {
    return transactions.map((transaction) => ({
      id: transaction._id,
      title: transaction.props.title,
      value: transaction.props.value,
      type: Transaction.typeFromStringToBoolean(transaction.props.type),
      createdAt: transaction.props.createdAt,
      updatedAt: transaction.props.updatedAt,
    }));
  }
}
