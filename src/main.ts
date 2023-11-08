import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './Error/HttpExceptionFilter';

async function createServer(): Promise<void> {
  try {
    const app = await NestFactory.create(AppModule, new ExpressAdapter());
    app.enableCors({
      origin: 'http://localhost:3000',
      credentials: true,
    });
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(5000);
    console.log('Server is running on port 5000');
  } catch (error) {
    console.error('Error starting the server', error);
  }
}
createServer();
