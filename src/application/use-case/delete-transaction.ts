import { ApiError } from '@/common/api-error';
import { StatusCode } from '@/common/status-code';
import { DeleteTransactionDTO } from '@/infrastructure/dtos/delete-transaction-dto';
import { ITransactionRepository } from '@/application/repositories/itransaction-repository';
import { Logger } from '@/infrastructure/services/logger';

export class DeleteTransaction {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(input: DeleteTransactionDTO) {
    Logger.info('starting DeleteTransaction');
    Logger.info('searching transaction by id');
    Logger.debug(`calling transactionRepository.get. Input: ${input}`);
    const transactionAlreadyExistis = await this.transactionRepository.get(
      input.id,
    );
    if (!transactionAlreadyExistis) {
      Logger.info('transaction not found');
      Logger.warn(new ApiError('Transaction not found', StatusCode.NOT_FOUND));
      throw new ApiError('Transaction not found', StatusCode.NOT_FOUND);
    }
    Logger.info('transaction found successfully');
    Logger.debug(`calling transactionRepository.delete. Input: ${input.id}`);
    return this.transactionRepository.delete(input.id);
  }
}
