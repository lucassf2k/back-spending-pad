import { Router, type Request, type Response } from 'express'
import {
  createUserControllerFactory,
  getUserOfIdControllerFactory,
} from '../../../main/factories/user-factories'

const userRoutes = Router()
userRoutes.post('/', (request: Request, response: Response) => {
  createUserControllerFactory().handle(request, response)
})
userRoutes.get('/:id', (request: Request, response: Response) => {
  getUserOfIdControllerFactory().handle(request, response)
})
export { userRoutes }
