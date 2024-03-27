import { User } from '../../domain/user'

export interface IUserRepository {
  save(user: User): boolean
  update(id: string, updatedUser: User): boolean
  delete(id: string): boolean
  get(id: string): User | undefined
  list(): User[] | undefined
}
