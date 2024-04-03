import { DeleteTransactionDTO } from '../../infrastructure/dtos/delete-transaction-dto'
import { ITransactionRepository } from '../repositories/itransaction-repository'

export class DeleteTransaction {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  async execute(input: DeleteTransactionDTO) {
    return this.transactionRepository.delete(input.id)
  }
}
