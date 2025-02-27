import { ApiError } from '@/common/api-error';
import { StatusCode } from '@/common/status-code';
import { Transaction } from '@/domain/transaction';
import { ITransactionRepository } from '@/application/repositories/itransaction-repository';
import { UpdateTransactionDTO } from '@/infrastructure/dtos/update-transaction-dto';

export class UpdateTransaction {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(input: UpdateTransactionDTO) {
    const transactionAlreadyExists = await this.transactionRepository.get(
      input.params.id,
    );
    if (!transactionAlreadyExists) {
      throw new ApiError('Transaction not found', StatusCode.NOT_FOUND);
    }
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
    const output = await this.transactionRepository.update(updatedTransaction);
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
