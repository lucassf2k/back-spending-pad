import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import { routes } from './infrastructure/express/routes'
import { ENV } from './infrastructure/configurations/environments'
import { errorHandler } from './infrastructure/express/middlewares/error-handler'
import { swaggerService } from './infrastructure/services/swagger-service'

function main() {
  const app = express()
  app.use(express.json())
  app.use(cors())
  swaggerService(app)
  app.use('/api', routes)
  app.use(errorHandler)
  app.listen(ENV.APP_PORT, () =>
    console.log(
      `HTTP server is running on PORT ${ENV.APP_PORT}! (http://localhost:3001/api/docs)`,
    ),
  )
}

main()
