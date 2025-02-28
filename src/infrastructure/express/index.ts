import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import { routes } from '@/infrastructure/express/routes';
import { ENV } from '@/infrastructure/configurations/environments';
import { swaggerService } from '@/infrastructure/services/swagger-service';
import { errorHandler } from '@/infrastructure/express/middlewares/error-handler';
import { Logger } from '../services/logger';
import { loggerMiddleware } from './middlewares/logger-middleware';

export function ExpressApplication() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(loggerMiddleware);
  swaggerService(app);
  app.use('/api/', routes);
  app.use(errorHandler);
  app.listen(ENV.APP_PORT, () =>
    Logger.info(
      `HTTP server is running on PORT ${ENV.APP_PORT}! (http://localhost:${ENV.APP_PORT}/api/${ENV.API_VERSION}/docs)`,
    ),
  );
}
