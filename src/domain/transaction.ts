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
  private readonly _id: string
  private readonly props: TransactionProps

  constructor(props: TransactionProps) {
    this.props = props
  }

  get id(): string {
    return this._id
  }

  get value(): number {
    return this.props.value
  }

  get description(): string {
    return this.props.description
  }

  get type(): TransactionTypes {
    return this.props.type
  }
}
