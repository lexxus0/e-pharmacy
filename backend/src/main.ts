import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT ?? 8080;

  app.use(helmet());
  app.use(cookieParser());
  app.enableCors();

  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
}

bootstrap();
