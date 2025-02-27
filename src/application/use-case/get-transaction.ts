import { Transaction } from '@/domain/transaction';
import { ITransactionRepository } from '@/application/repositories/itransaction-repository';
import { GetTransactionDTO } from '@/infrastructure/dtos/get-transaction-dto';
import { ApiError } from '@/common/api-error';
import { StatusCode } from '@/common/status-code';

export class GetTransaction {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(input: GetTransactionDTO) {
    const transaction = await this.transactionRepository.get(input.id);
    if (!transaction) {
      throw new ApiError('Transaction not found', StatusCode.NOT_FOUND);
    }
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
