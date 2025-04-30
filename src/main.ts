import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);



  app.setGlobalPrefix('api')

  await app.listen(process.env.APP_PORT ?? 3000);
  console.log(`Server running at http://localhost:${process.env.APP_PORT}/api`);
  console.log(`swagger running at http://localhost:${process.env.APP_PORT}/doc`);
  
}
bootstrap();
