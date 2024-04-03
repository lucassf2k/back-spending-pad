import { Router, type Request, type Response } from 'express'
import {
  createTransactionControllerFactory,
  deleteTransactionControllerFactory,
  getTransactionControllerFactory,
  listTransactionControllerFactory,
  updateTransactionControllerFactory,
} from '../../../main/factories/transaction-factories'

const transactionRoutes = Router()
transactionRoutes.post('/', (request: Request, response: Response) => {
  createTransactionControllerFactory().handle(request, response)
})
transactionRoutes.get(
  '/list/:userId',
  (request: Request, response: Response) => {
    listTransactionControllerFactory().handle(request, response)
  },
)
transactionRoutes.get('/:id', (request: Request, response: Response) => {
  getTransactionControllerFactory().handle(request, response)
})
transactionRoutes.delete('/:id', (request: Request, response: Response) => {
  deleteTransactionControllerFactory().handle(request, response)
})
transactionRoutes.put('/:id', (request: Request, response: Response) => {
  updateTransactionControllerFactory().handle(request, response)
})
export { transactionRoutes }
