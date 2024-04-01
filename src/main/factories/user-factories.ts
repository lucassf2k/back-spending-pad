import { CreateUser } from '../../application/use-case/create-user'
import { CreateUserController } from '../../infrastructure/express/controllers/create-user-controller'
import { IController } from '../../infrastructure/express/controllers/icontoller'
import { PrismaUserRepository } from '../../infrastructure/repositories/prisma/prisma-user-repository'

const userRepository = new PrismaUserRepository()

export function createUserControllerFactory(): IController {
  const createUser = new CreateUser(userRepository)
  return new CreateUserController(createUser)
}
