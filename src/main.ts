import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');
  // Only enable cors in development since our frontend will be serve in the same domain during production
  if (configService.get<string>('NODE_ENV') !== 'production') {
    app.enableCors();
  }
  const port = configService.get<string>('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
