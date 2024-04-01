import { ApiError } from '../common/api-error'
import { StatusCode } from '../common/status-code'
import { IdService } from '../infrastructure/services/id-service'

export enum TransactionTypes {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export type TransactionProps = {
  value: number
  titile: string
  description: string
  type: TransactionTypes
}

export class Transaction {
  readonly _id: string
  readonly props: TransactionProps

  constructor(id: string, props: TransactionProps) {
    if (!id) this._id = IdService.UUID()
    this.props = props
  }

  static getType(input: string): TransactionTypes {
    if (input === TransactionTypes.INCOME) return TransactionTypes.INCOME
    if (input === 'EXPENSE') return TransactionTypes.EXPENSE
    throw new ApiError('transaction type invalid', StatusCode.BAD_REQUEST)
  }
}
