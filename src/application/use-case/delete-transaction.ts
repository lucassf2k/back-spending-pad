import { ApiError } from '@/common/api-error';
import { StatusCode } from '@/common/status-code';
import { DeleteTransactionDTO } from '@/infrastructure/dtos/delete-transaction-dto';
import { ITransactionRepository } from '@/application/repositories/itransaction-repository';

export class DeleteTransaction {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(input: DeleteTransactionDTO) {
    const transactionAlreadyExistis = await this.transactionRepository.get(
      input.id,
    );
    if (!transactionAlreadyExistis) {
      throw new ApiError('Transaction not found', StatusCode.NOT_FOUND);
    }
    return this.transactionRepository.delete(input.id);
  }
}
