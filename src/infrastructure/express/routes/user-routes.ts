import { Router } from 'express'
import { createUserControllerFactory } from '../../../main/factories/user-factories'

const userRoutes = Router()
userRoutes.post('/', createUserControllerFactory())
export { userRoutes }
