import { User } from '@/domain/user';
import { IUserRepository } from '@/application/repositories/iuser-repository';
import { GetUserOfIdDTO } from '@/infrastructure/dtos/get-user-dto';
import { Logger } from '@/infrastructure/services/logger';

export class GetUserOfId {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: GetUserOfIdDTO) {
    Logger.info('starting GetUserOfId');
    Logger.info('searching user by id');
    Logger.debug(`calling userRepository.get. Input: ${input.id}`);
    const user = await this.userRepository.get(input.id);
    if (!user) {
      Logger.info('user not found');
      Logger.warn('attempt to find a non-existent user');
      return undefined;
    }
    Logger.info('user found successfully');
    return GetUserOfId.output(user);
  }

  static output(input: User) {
    return {
      id: input._id,
      email: input.props.email,
      created_at: input.props.createAt,
      updated_at: input.props.updatedAt,
    };
  }
}
