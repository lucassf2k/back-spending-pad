import { Router, type Request, type Response } from 'express'
import {
  createUserControllerFactory,
  getUserOfIdControllerFactory,
  signInControllerFactory,
} from '../../../main/factories/user-factories'

const userRoutes = Router()
userRoutes.post('/sign-in', (request: Request, response: Response) => {
  signInControllerFactory().handle(request, response)
})
userRoutes.post('/', (request: Request, response: Response) => {
  createUserControllerFactory().handle(request, response)
})
userRoutes.get('/:id', (request: Request, response: Response) => {
  getUserOfIdControllerFactory().handle(request, response)
})
export { userRoutes }
