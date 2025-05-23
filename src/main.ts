import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import './polyfill';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // removes fields that are not defined in the DTO
      forbidNonWhitelisted: true, // Throws an error if there are any additional fields
      transform: true, //Automatically transforms the payloud to the DTO type
    }),
  );

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://fe-budget-tracker-production.up.railway.app',
      'https://track-expenses.up.railway.app',
      'https://budget-tracker-production-c2f4.up.railway.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  await app.listen(process.env.PORT || 3025);
}
if (require.main === module) {
  bootstrap();
}
export default bootstrap;
