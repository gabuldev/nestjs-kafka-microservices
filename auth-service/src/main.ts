import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ip = require('ip');

const logger = new Logger("main");
const host = process.env.HOST_IP || ip.address()
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
   
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'challenge-consumer ' + Math.random(),
        },
      },
    },
  );
  app.listen(() => {
    logger.log(`Auth Service listening on ${host}...`)
  });
}
bootstrap();