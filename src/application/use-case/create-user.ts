import { User } from '../../domain/user'
import { Email } from '../../domain/email'
import { CreateUserDTO } from '../../infrastructure/dtos/create-user-dto'
import { PBKDF2Password } from '../../domain/pbkdf2-password'
import { IUserRepository } from '../repositories/iuser-repository'

export class CreateUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: CreateUserDTO): Promise<User> {
    const newUser = new User({
      name: input.name,
      email: new Email(input.email),
      password: PBKDF2Password.create(input.password),
      transactions: [],
    })
    await this.userRepository.save(newUser)
    return newUser
  }
}
