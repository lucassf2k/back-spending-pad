import { ApiError } from '@/common/api-error';
import { StatusCode } from '@/common/status-code';
import { Transaction } from '@/domain/transaction';
import { ITransactionRepository } from '@/application/repositories/itransaction-repository';
import { UpdateTransactionDTO } from '@/infrastructure/dtos/update-transaction-dto';
import { Logger } from '@/infrastructure/services/logger';

export class UpdateTransaction {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(input: UpdateTransactionDTO) {
    Logger.info('starting UpdateTransaction');
    Logger.info('searching trasaction by id');
    Logger.debug(
      `calling transactionRepository.get. Input: ${input.params.id}`,
    );
    const transactionAlreadyExists = await this.transactionRepository.get(
      input.params.id,
    );
    if (!transactionAlreadyExists) {
      Logger.info('transaction not found');
      throw new ApiError('Transaction not found', StatusCode.NOT_FOUND);
    }
    Logger.info('transaction found successfully');
    Logger.info('restoring a Transaction instance');
    Logger.debug(
      `calling Transaction.restore for transaction id=${transactionAlreadyExists._id}`,
    );
    const updatedTransaction = Transaction.restore(
      transactionAlreadyExists._id,
      {
        title: input.body.title || transactionAlreadyExists.props.title,
        value: input.body.value || transactionAlreadyExists.props.value,
        type:
          Transaction.typeFromBooleanToString(input.body.type) ||
          transactionAlreadyExists.props.type,
      },
    );
    Logger.info('updating transaction');
    Logger.debug(
      `calling transactionRepository.update for transaction id=${updatedTransaction._id}. Input=${updatedTransaction}`,
    );
    const output = await this.transactionRepository.update(updatedTransaction);
    Logger.info('transaction successfully updated');
    return UpdateTransaction.output(output);
  }

  static output(input: Transaction) {
    return {
      id: input._id,
      title: input.props.title,
      value: input.props.value,
      type: Transaction.typeFromStringToBoolean(input.props.type),
      created_at: input.props.createdAt,
      updated_at: input.props.updatedAt,
    };
  }
}
