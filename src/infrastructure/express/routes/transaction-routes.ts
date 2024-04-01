import { Router, type Request, type Response } from 'express'
import {
  createTransactionControllerFactory,
  listTransactionControllerFactory,
} from '../../../main/factories/transaction-factories'

const transactionRoutes = Router()
transactionRoutes.get('/:id', (request: Request, response: Response) => {
  listTransactionControllerFactory().handle(request, response)
})
transactionRoutes.post('/', (request: Request, response: Response) => {
  createTransactionControllerFactory().handle(request, response)
})
export { transactionRoutes }
