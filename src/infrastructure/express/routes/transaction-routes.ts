import { Router, type Request, type Response } from 'express'
import {
  createTransactionControllerFactory,
  getTransactionControllerFactory,
  listTransactionControllerFactory,
} from '../../../main/factories/transaction-factories'

const transactionRoutes = Router()
transactionRoutes.get('/:id', (request: Request, response: Response) => {
  getTransactionControllerFactory().handle(request, response)
})
transactionRoutes.get(
  '/list/:userId',
  (request: Request, response: Response) => {
    listTransactionControllerFactory().handle(request, response)
  },
)
transactionRoutes.post('/', (request: Request, response: Response) => {
  createTransactionControllerFactory().handle(request, response)
})
export { transactionRoutes }
