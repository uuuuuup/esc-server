import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('../cert/privkey.pem'),
    cert: fs.readFileSync('../cert/cert.pem'),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  await app.listen(4000);
}
bootstrap();
