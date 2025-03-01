import { Transaction } from '@/domain/transaction';
import { ListTransactionDTO } from '@/infrastructure/dtos/list-transaction-dto';
import { ITransactionRepository } from '@/application/repositories/itransaction-repository';
import { Logger } from '@/infrastructure/services/logger';

export class ListTransaction {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(input: ListTransactionDTO) {
    Logger.info('starting ListTransaction');
    const skip = (input.page - 1) * input.pageSize;
    Logger.info('searching all transactions by userId');
    Logger.debug(
      `calling transactionRepository.getAll. Input: userId=${input.userId}, skip=${skip}, take=${input.pageSize}`,
    );
    const transactions = await this.transactionRepository.getAll(
      input.userId,
      skip,
      input.pageSize,
    );
    Logger.info('all transactions were found successfully');
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
