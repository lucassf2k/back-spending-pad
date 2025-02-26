import { ApiError } from '../../common/api-error';
import { StatusCode } from '../../common/status-code';
import { Transaction } from '../../domain/transaction';
import { CreateTransactionDTO } from '../../infrastructure/dtos/create-transaction-dto';
import { ITransactionRepository } from '../repositories/itransaction-repository';
import { IUserRepository } from '../repositories/iuser-repository';

export class CreateTransaction {
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: CreateTransactionDTO) {
    const userExists = await this.userRepository.get(input.userId);
    if (!userExists) {
      throw new ApiError('User not found', StatusCode.BAD_REQUEST);
    }
    const newTransaction = Transaction.create({
      value: input.value,
      title: input.title,
      type: Transaction.typeFromBooleanToString(input.type),
    });
    return this.transactionRepository.save(input.userId, newTransaction);
  }
}
