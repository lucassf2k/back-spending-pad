import { Transaction } from '@/domain/transaction';
import { ITransactionRepository } from '@/application/repositories/itransaction-repository';
import { GetTransactionDTO } from '@/infrastructure/dtos/get-transaction-dto';
import { ApiError } from '@/common/api-error';
import { StatusCode } from '@/common/status-code';
import { Logger } from '@/infrastructure/services/logger';

export class GetTransaction {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(input: GetTransactionDTO) {
    Logger.info('starting GetTransaction');
    Logger.info('searching transaction by id');
    Logger.debug(`calling transactionRepository.get. Input: ${input.id}`);
    const transaction = await this.transactionRepository.get(input.id);
    if (!transaction) {
      Logger.info('transaction not found');
      Logger.warn(new ApiError('Transaction not found', StatusCode.NOT_FOUND));
      throw new ApiError('Transaction not found', StatusCode.NOT_FOUND);
    }
    Logger.info('transaction found successfully');
    return GetTransaction.output(transaction);
  }

  static output(input: Transaction) {
    return {
      id: input._id,
      title: input.props.title,
      value: input.props.value,
      type: Transaction.typeFromStringToBoolean(input.props.type),
      createdAt: input.props.createdAt,
      updatedAt: input.props.updatedAt,
    };
  }
}
