import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(5000);
}
bootstrap();
