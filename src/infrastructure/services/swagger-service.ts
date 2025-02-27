import type { Express } from 'express';
import SwaggerUI from 'swagger-ui-express';
import { SwaggerDocument } from '@/infrastructure/configurations/swagger-document';

export function swaggerService(app: Express): void {
  app.use('/api/v1/docs', SwaggerUI.serve, SwaggerUI.setup(SwaggerDocument));
}
