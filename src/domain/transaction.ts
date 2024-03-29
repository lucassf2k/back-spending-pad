import { randomUUID } from 'node:crypto'

export enum TransactionTypes {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export type TransactionProps = {
  value: number
  description: string
  type: TransactionTypes
}

export class Transaction {
  readonly _id: string
  readonly props: TransactionProps

  constructor(props: TransactionProps) {
    if (!this._id) this._id = randomUUID()
    this.props = props
  }
}
