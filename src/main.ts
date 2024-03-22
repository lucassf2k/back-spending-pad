import express from 'express'
import { ENV } from './infrastructure/configurations/environments'

function main() {
  const app = express()
  app.use(express.json())
  app.listen(ENV.APP_PORT, () =>
    console.log(`HTTP server is running on PORT ${ENV.APP_PORT}`),
  )
}

main()
