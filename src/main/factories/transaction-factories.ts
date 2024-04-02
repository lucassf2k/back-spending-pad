import { CreateTransaction } from '../../application/use-case/create-transaction'
import { IController } from '../../infrastructure/express/controllers/icontoller'
import { CreateTransactionController } from '../../infrastructure/express/controllers/create-transaction-controller'
import { PrismaTransactionRepository } from '../../infrastructure/repositories/prisma/prisma-transaction-repository'
import { ListTransactionController } from '../../infrastructure/express/controllers/list-transaction-controller'
import { ListTransaction } from '../../application/use-case/list-transaction'
import { GetTransactionController } from '../../infrastructure/express/controllers/get-transaction-controller'
import { GetTransaction } from '../../application/use-case/get-transaction'

const transactionRepository = new PrismaTransactionRepository()

export function createTransactionControllerFactory(): IController {
  const createTransaction = new CreateTransaction(transactionRepository)
  return new CreateTransactionController(createTransaction)
}

export function listTransactionControllerFactory(): IController {
  const listTransaction = new ListTransaction(transactionRepository)
  return new ListTransactionController(listTransaction)
}

export function getTransactionControllerFactory(): IController {
  const getTransaction = new GetTransaction(transactionRepository)
  return new GetTransactionController(getTransaction)
}
