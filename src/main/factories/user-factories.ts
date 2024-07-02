import { CreateUser } from '../../application/use-case/create-user';
import { GetUserOfId } from '../../application/use-case/get-user-of-id';
import { SignIn } from '../../application/use-case/sign-in';
import { CreateUserController } from '../../infrastructure/express/controllers/create-user-controller';
import { GetUserOfIdController } from '../../infrastructure/express/controllers/get-user-of-id-controller';
import { IController } from '../../infrastructure/express/controllers/icontoller';
import { SignInController } from '../../infrastructure/express/controllers/sign-in-controller';
import { PrismaUserRepository } from '../../infrastructure/repositories/prisma/prisma-user-repository';

const userRepository = new PrismaUserRepository();

export function createUserControllerFactory(): IController {
  const createUser = new CreateUser(userRepository);
  return new CreateUserController(createUser);
}

export function getUserOfIdControllerFactory(): IController {
  const getUserOfId = new GetUserOfId(userRepository);
  return new GetUserOfIdController(getUserOfId);
}

export function signInControllerFactory(): IController {
  const signIn = new SignIn(userRepository);
  return new SignInController(signIn);
}
