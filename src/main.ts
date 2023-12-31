import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api2/');
  app.enableCors();

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(3001);
}
bootstrap();
