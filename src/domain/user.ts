import { Email } from './email'
import { IPassword } from './ipassword'
import { Transaction } from './transaction'

export type UserProps = {
  name: string
  email: Email
  password: IPassword
  transactions: Transaction[]
}

export class User {
  private readonly _id: string
  private readonly props: UserProps

  constructor(props: UserProps) {
    this.props = props
  }

  get name(): string {
    return this.props.name
  }

  get id(): string {
    return this._id
  }

  get email(): Email {
    return this.props.email
  }

  get password(): IPassword {
    return this.props.password
  }
}
