// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Add global validation
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true, // removes fields that are not defined in the DTO
//       forbidNonWhitelisted: true, // Throws an error if there are any additional fields
//       transform: true, //Automatically transforms the payloud to the DTO type
//     }),
//   );

//   app.enableCors({
//     origin: [
//       'http://localhost:5173',
//       'https://fe-budget-tracker.onrender.com',
//       'https://fe-budget-tracker.onrender.com/',
//     ],
//     credentials: true,
//   });

//   await app.listen(process.env.PORT || 3025);
// }
// if (require.main === module) {
//   bootstrap();
// }
// export default bootstrap;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// Funkcja do inicjalizacji aplikacji
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  return app;
}

// Dla lokalnego rozwoju
async function runServer() {
  const app = await bootstrap();
  await app.listen(process.env.PORT || 3000);
}

// Uruchom serwer lokalnie, ale nie w środowisku Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  runServer();
}

// Eksportuj funkcję dla środowiska serverless Vercel
export default async (req, res) => {
  const app = await bootstrap();
  await app.init();

  const server = app.getHttpServer();
  const router = server._events.request._router;

  return router.handle(req, res);
};
