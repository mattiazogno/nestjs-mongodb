import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  ); // ogni endpoint avrà un validation in base al DTO o altro

  // Intercettori globali per logging e trasformazione della risposta
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );
  
  const PORT = process.env.PORT ?? 3000;
  console.log(`Running port: ${PORT}`);

  app.useGlobalFilters(new HttpExceptionFilter()); // filtro globale per gestire eccezioni HTTP in modo uniforme
  await app.listen(PORT);
}
bootstrap();
