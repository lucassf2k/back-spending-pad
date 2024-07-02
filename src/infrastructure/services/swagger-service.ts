import type { Express } from 'express';
import SwaggerUI from 'swagger-ui-express';
import { SwaggerDocument } from '../configurations/swagger-document';

export function swaggerService(app: Express): void {
  app.use('/api/docs', SwaggerUI.serve, SwaggerUI.setup(SwaggerDocument));
}
