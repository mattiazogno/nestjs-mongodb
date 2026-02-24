import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // ogni endpoint avrà un validation in base al DTO o altro
  const PORT = process.env.PORT ?? 3000;
  console.log(`Running port: ${PORT}`)
  await app.listen(PORT);
}
bootstrap();
