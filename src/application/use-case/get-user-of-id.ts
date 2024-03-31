import { User } from '../../domain/user'
import { ApiError } from '../../common/api-error'
import { StatusCode } from '../../common/status-code'
import { IUserRepository } from '../repositories/iuser-repository'
import { GetUserDTO } from '../../infrastructure/dtos/get-user-dto'

export class GetUserOfId {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: GetUserDTO): Promise<User> {
    const user = await this.userRepository.get(input.id)
    if (!user) throw new ApiError('user not found', StatusCode.NOT_FOUND)
    return user
  }
}
