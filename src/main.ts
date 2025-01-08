import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  BadGatewayExceptionFilter,
  BadRequestExceptionFilter,
  ForbiddenExceptionFilter,
  InternalServerExceptionFilter,
  UnauthorizedExceptionFilter,
} from '@filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // for error handeling on receiving request
  app.useGlobalFilters(new BadRequestExceptionFilter());
  app.useGlobalFilters(new ForbiddenExceptionFilter());
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  app.useGlobalFilters(new BadGatewayExceptionFilter());
  app.useGlobalFilters(new InternalServerExceptionFilter());

  app.enableShutdownHooks();
  app.setGlobalPrefix('/api/v1', {
    exclude: ['/'],
  });
  await app.listen(3000);
}
bootstrap();
