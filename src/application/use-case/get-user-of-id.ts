import { User } from '../../domain/user'
import { IUserRepository } from '../repositories/iuser-repository'
import { GetUserDTO } from '../../infrastructure/dtos/get-user-dto'

export class GetUserOfId {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: GetUserDTO): Promise<User> {
    return this.userRepository.get(input.id)
  }
}
