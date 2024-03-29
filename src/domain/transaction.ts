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

  constructor(props: TransactionProps) {
    if (!this._id) this._id = IdService.UUID()
    this.props = props
  }
}
