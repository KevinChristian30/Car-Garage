import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

const validationPipeOptions: ValidationPipeOptions = {
  whitelist: true
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  await app.listen(3000);
}
bootstrap();
