import { User } from '../../domain/user'
import { Email } from '../../domain/email'
import {
  CreateUserDTO,
  CreateUserValidation,
} from '../../infrastructure/dtos/create-user-dto'
import { PBKDF2Password } from '../../domain/pbkdf2-password'
import { IUserRepository } from '../repositories/iuser-repository'

export class CreateUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: CreateUserDTO): Promise<User> {
    const userValid = CreateUserValidation.parse(input)
    const password = PBKDF2Password.create(userValid.password)
    const newUser = new User({
      name: userValid.name,
      email: new Email(userValid.email),
      password,
      transactions: [],
    })
    await this.userRepository.save(newUser)
    return newUser
  }
}
