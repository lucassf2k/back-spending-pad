import { Router, type Request, type Response } from 'express'
import { createUserControllerFactory } from '../../../main/factories/user-factories'

const userRoutes = Router()
userRoutes.post('/', (request: Request, response: Response) => {
  createUserControllerFactory().handle(request, response)
})
export { userRoutes }
