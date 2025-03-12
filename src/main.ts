import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Dodaj globalną walidację
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // removes fields that are not defined in the DTO
      forbidNonWhitelisted: true, // Throws an error if there are any additional fields
      transform: true, //Automatically transforms the payloud to the DTO type
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
