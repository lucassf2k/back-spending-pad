import { ApiError } from '../../common/api-error'
import { StatusCode } from '../../common/status-code'
import { SignInDTO } from '../../infrastructure/dtos/sign-in-dto'
import { JwtService } from '../../infrastructure/services/JwtService'
import { IUserRepository } from '../repositories/iuser-repository'

export type UserPayload = {
  id: string
  email: string
}

export class SignIn {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: SignInDTO) {
    const user = await this.userRepository.getOfEmail(input.email)
    if (!user) {
      throw new ApiError('Usuário sem permisão', StatusCode.UNAUTHORIZED)
    }
    const isValidPassword = user.props.password.validate(input.password)
    if (!isValidPassword) {
      throw new ApiError('Senha incorreta', StatusCode.UNAUTHORIZED)
    }
    const day = 60 * 60 * 24
    const userPayload: UserPayload = {
      id: user._id,
      email: user.props.email.value,
    }
    const secretKey = process.env.JWT_SECRET || 'aasdajnabdbaudba'
    const token = JwtService.sign({ user: userPayload }, secretKey, day)
    return { token }
  }
}
