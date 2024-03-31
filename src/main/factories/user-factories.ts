import { CreateUser } from '../../application/use-case/create-user'
import { IUserRepository } from '../../application/repositories/iuser-repository'
import { CreateUserController } from '../../infrastructure/express/controllers/create-user-controller'

export function createUserControllerFactory() {
  let userRepository: IUserRepository
  const createUser = new CreateUser(userRepository)
  const createUserController = new CreateUserController(createUser)
  return createUserController
}
