import { User } from '@/domain/user';
import { Email } from '@/domain/email';
import { CreateUserDTO } from '@/infrastructure/dtos/create-user-dto';
import { PBKDF2Password } from '@/domain/pbkdf2-password';
import { IUserRepository } from '@/application/repositories/iuser-repository';
import { ApiError } from '@/common/api-error';
import { StatusCode } from '@/common/status-code';
import { Logger } from '@/infrastructure/services/logger';

export class CreateUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: CreateUserDTO): Promise<User> {
    Logger.info(`starting CreateUser for ${input.email}`);
    Logger.debug(
      `calling userRepository.getOfEmail to user of email: ${input.email}`,
    );
    const userAlreadyExists = await this.userRepository.getOfEmail(input.email);
    if (userAlreadyExists) {
      Logger.warn(
        `attempt to create a user with existing email: ${input.email}`,
      );
      throw new ApiError('Email already in use', StatusCode.CONFLICT);
    }
    Logger.debug('creating a new instance of User');
    const newUser = User.create({
      name: input.name,
      email: new Email(input.email),
      password: PBKDF2Password.create(input.password),
      transactions: [],
    });
    Logger.debug(
      `calling userRepository.save method to user of id: ${newUser._id}`,
    );
    await this.userRepository.save(newUser);
    Logger.info(`user id ${newUser._id} successfully created`);
    return newUser;
  }
}
