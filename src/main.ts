import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import { routes } from './infrastructure/express/routes'
import { ENV } from './infrastructure/configurations/environments'
import { errorHandler } from './infrastructure/express/middlewares/error-handler'

function main() {
  const app = express()
  app.use(express.json())
  app.use(cors())
  app.use('api', routes)
  app.use(errorHandler)
  app.listen(ENV.APP_PORT, () =>
    console.log(`HTTP server is running on PORT ${ENV.APP_PORT}`),
  )
}

main()
