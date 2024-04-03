import { User } from '../../domain/user'
import { Email } from '../../domain/email'
import { CreateUserDTO } from '../../infrastructure/dtos/create-user-dto'
import { PBKDF2Password } from '../../domain/pbkdf2-password'
import { IUserRepository } from '../repositories/iuser-repository'
import { ApiError } from '../../common/api-error'
import { StatusCode } from '../../common/status-code'

export class CreateUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: CreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.userRepository.getOfEmail(input.email)
    if (userAlreadyExists) {
      throw new ApiError('e-mail já em uso', StatusCode.CONFLICT)
    }
    const newUser = User.create({
      name: input.name,
      email: new Email(input.email),
      password: PBKDF2Password.create(input.password),
      transactions: [],
    })
    await this.userRepository.save(newUser)
    return newUser
  }
}
