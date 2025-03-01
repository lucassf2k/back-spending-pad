import { ApiError } from '@/common/api-error';
import { StatusCode } from '@/common/status-code';
import { ENV } from '@/infrastructure/configurations/environments';
import { SignInDTO } from '@/infrastructure/dtos/sign-in-dto';
import { JwtService } from '@/infrastructure/services/JwtService';
import { IUserRepository } from '@/application/repositories/iuser-repository';
import { Logger } from '@/infrastructure/services/logger';

export type UserPayload = {
  id: string;
  email: string;
};

export class SignIn {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: SignInDTO) {
    Logger.info('starting SignIn');
    Logger.debug(
      `calling userRepository.getOfEmail for email user=${input.email}`,
    );
    const user = await this.userRepository.getOfEmail(input.email);
    if (!user) {
      Logger.info('user not found');
      Logger.warn(
        `trying to sign in without a registered email address. Email=${input.email}`,
      );
      throw new ApiError('Unauthorized user', StatusCode.UNAUTHORIZED);
    }
    Logger.info('user found successfully');
    Logger.info('validating the password');
    Logger.debug(
      `calling user.props.password.validate for email=${input.email}. Input=${input.password}`,
    );
    const isValidPassword = user.props.password.validate(input.password);
    if (!isValidPassword) {
      Logger.info('wrong password');
      throw new ApiError('Wrong password', StatusCode.UNAUTHORIZED);
    }
    const day = 60 * 60 * 24;
    const userPayload: UserPayload = {
      id: user._id,
      email: user.props.email.value,
    };
    Logger.info('signing jwt token');
    Logger.debug(
      `calling JwtService.sign for email user=${input.email}. Input: user=${userPayload}`,
    );
    const token = JwtService.sign({ user: userPayload }, ENV.JWT_SECRET_KEY, {
      expiresIn: day,
    });
    Logger.info('token successfully signed');
    return { token };
  }
}
