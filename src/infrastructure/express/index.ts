import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import { routes } from '@/infrastructure/express/routes';
import { ENV } from '@/infrastructure/configurations/environments';
import { swaggerService } from '@/infrastructure/services/swagger-service';
import { errorHandler } from '@/infrastructure/express/middlewares/error-handler';

export function ExpressApplication() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  swaggerService(app);
  app.use('/api', routes);
  app.use(errorHandler);
  app.listen(ENV.APP_PORT, () =>
    console.log(
      `HTTP server is running on PORT ${ENV.APP_PORT}! (http://localhost:${ENV.APP_PORT}/api/docs)`,
    ),
  );
}
