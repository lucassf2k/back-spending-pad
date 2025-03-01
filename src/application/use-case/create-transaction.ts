import { ApiError } from '@/common/api-error';
import { StatusCode } from '@/common/status-code';
import { Transaction } from '@/domain/transaction';
import { CreateTransactionDTO } from '@/infrastructure/dtos/create-transaction-dto';
import { ITransactionRepository } from '@/application/repositories/itransaction-repository';
import { IUserRepository } from '@/application/repositories/iuser-repository';
import { Logger } from '@/infrastructure/services/logger';

export class CreateTransaction {
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: CreateTransactionDTO) {
    Logger.info(
      `starting CreateTransaction for user id: ${input.userId}, payloda: ${input}`,
    );
    Logger.info('searching for user by id');
    Logger.debug(
      `calling userRepository.get to user of id. Input: ${input.userId}`,
    );
    const userExists = await this.userRepository.get(input.userId);
    if (!userExists) {
      Logger.warn(
        `attempt to create transaction with no-existent user id. Input: ${input.userId}`,
      );
      Logger.warn(new ApiError('User not found', StatusCode.BAD_REQUEST));
      throw new ApiError('User not found', StatusCode.BAD_REQUEST);
    }
    Logger.info('user found successfully');
    Logger.debug(
      `creating a new instance of Transaction. Input: ${(input.title, input.type, input.value)}`,
    );
    const newTransaction = Transaction.create({
      value: input.value,
      title: input.title,
      type: Transaction.typeFromBooleanToString(input.type),
    });
    Logger.debug(
      `calling transactionRepository.save for user id: ${input.userId}. Input: ${newTransaction}`,
    );
    return this.transactionRepository.save(input.userId, newTransaction);
  }
}
