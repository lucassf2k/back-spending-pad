import { User } from '../../domain/user';
import { IUserRepository } from '../repositories/iuser-repository';
import { GetUserOfIdDTO } from '../../infrastructure/dtos/get-user-dto';

export class GetUserOfId {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: GetUserOfIdDTO) {
    const user = await this.userRepository.get(input.id);
    if (!user) return undefined;
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
