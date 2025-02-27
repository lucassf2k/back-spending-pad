import { PrismaClient } from '@prisma/client';
import { User } from '@/domain/user';
import { Email } from '@/domain/email';
import { makePassword } from '@/main/factories/password-factory';
import { IUserRepository } from '@/application/repositories/iuser-repository';
import { prismaClient } from '@/infrastructure/repositories/prisma';

export class PrismaUserRepository implements IUserRepository {
  private readonly prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = prismaClient;
  }

  async save(user: User): Promise<boolean> {
    const createdUser = await this.prismaClient.user.create({
      data: {
        id: user._id,
        email: user.props.email.value,
        name: user.props.name,
        passowrd_salt: user.props.password.salt,
        password_algotithm: user.props.password.algorithm,
        password_value: user.props.password.value,
      },
    });
    if (!createdUser.id) return false;
    return true;
  }

  // async update(id: string, updatedUser: User): Promise<boolean> {
  //   throw new Error('Method not implemented.')
  // }

  // async delete(id: string): Promise<boolean> {
  //   throw new Error('Method not implemented.')
  // }

  async get(id: string): Promise<User> {
    const user = await this.prismaClient.user.findUnique({
      where: { id: id },
    });
    if (!user) return undefined;
    return User.restore(user.id, {
      email: new Email(user.email),
      name: user.name,
      password: makePassword(user.password_algotithm).restore(
        user.password_value,
        user.passowrd_salt,
      ),
      transactions: [],
      createAt: user.created_at,
      updatedAt: user.updated_at,
    });
  }

  async getOfEmail(email: string): Promise<User> {
    const user = await this.prismaClient.user.findUnique({
      where: { email },
    });
    if (!user) return undefined;
    return User.restore(user.id, {
      email: new Email(user.email),
      name: user.name,
      password: makePassword(user.password_algotithm).restore(
        user.password_value,
        user.passowrd_salt,
      ),
      transactions: [],
      createAt: user.created_at,
      updatedAt: user.updated_at,
    });
  }
}
