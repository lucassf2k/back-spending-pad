import { Email } from './email';
import { IPassword } from './ipassword';
import { Transaction } from './transaction';
import { IdService } from '../infrastructure/services/id-service';

export type UserProps = {
  name: string;
  email: Email;
  password: IPassword;
  transactions: Transaction[];
  createAt?: Date;
  updatedAt?: Date;
};

export class User {
  readonly _id: string;
  readonly props: UserProps;

  private constructor(id: string, props: UserProps) {
    this._id = id;
    this.props = props;
  }

  static create(props: UserProps): User {
    const newID = IdService.UUID();
    return new User(newID, props);
  }

  static restore(id: string, props: UserProps): User {
    return new User(id, props);
  }
}
