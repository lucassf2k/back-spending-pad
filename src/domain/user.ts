import { Email } from './email'
import { IPassword } from './ipassword'
import { Transaction } from './transaction'
import { IdService } from '../infrastructure/services/id-service'

export type UserProps = {
  name: string
  email: Email
  password: IPassword
  transactions: Transaction[]
}

export class User {
  readonly _id: string
  readonly props: UserProps

  constructor(props: UserProps) {
    if (!this._id) this._id = IdService.UUID()
    this.props = props
  }
}
