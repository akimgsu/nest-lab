import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

const logger: Logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('NODE_SERVER_PORT');
  app.use(cookieParser());
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
