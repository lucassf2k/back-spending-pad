import { ApiError } from '../common/api-error'
import { StatusCode } from '../common/status-code'
import { IdService } from '../infrastructure/services/id-service'

export enum TransactionTypes {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export type TransactionProps = {
  value: number
  title: string
  type: TransactionTypes
  createdAt?: Date
  updatedAt?: Date
}

export class Transaction {
  readonly _id: string
  readonly props: TransactionProps

  private constructor(id: string, props: TransactionProps) {
    this._id = id
    this.props = props
  }

  static create(props: TransactionProps): Transaction {
    const newID = IdService.UUID()
    return new Transaction(newID, props)
  }

  static restore(id: string, props: TransactionProps): Transaction {
    return new Transaction(id, props)
  }

  static getType(input: string): TransactionTypes {
    if (input === TransactionTypes.INCOME) return TransactionTypes.INCOME
    if (input === 'EXPENSE') return TransactionTypes.EXPENSE
    throw new ApiError('transaction type invalid', StatusCode.BAD_REQUEST)
  }

  static typeFromStringToBoolean(input: string): boolean {
    if (input === TransactionTypes.INCOME) return true
    if (input === 'EXPENSE') return false
    throw new ApiError('transaction type invalid', StatusCode.BAD_REQUEST)
  }

  static typeFromBooleanToString(input: boolean): TransactionTypes {
    if (input) return TransactionTypes.INCOME
    return TransactionTypes.EXPENSE
  }
}
