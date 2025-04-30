import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import SwaggerConfig from './config/swagger.config';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.use(helmet())

  app.setGlobalPrefix('api');
  // seagger config
  SwaggerConfig(app);

  await app.listen(process.env.APP_PORT ?? 3000);
  console.log(`Server running at http://localhost:${process.env.APP_PORT}/api`);
  console.log(
    `swagger running at http://localhost:${process.env.APP_PORT}/doc`,
  );
}
bootstrap();
