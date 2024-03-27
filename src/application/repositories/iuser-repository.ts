import { User } from '../../domain/user'

export interface IUserRepository {
  save(user: User): Promise<boolean>
  update(id: string, updatedUser: User): Promise<boolean>
  delete(id: string): Promise<boolean>
  get(id: string): Promise<User | undefined>
  list(): Promise<User[] | undefined>
}
