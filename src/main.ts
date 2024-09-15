import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import ms from 'ms';

import { AppModule } from './app.module.js';

async function bootstrap() {
  const port = +process.env.PORT || 80;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({ origin: '*', credentials: true, maxAge: ms('7 days') });

  await app.listen(port, async () =>
    Logger.log(`🚀 Application is running on: ${await app.getUrl()}`, bootstrap.name),
  );
}
bootstrap();
