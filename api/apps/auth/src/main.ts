import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AuthModule } from "./auth.module";
import { ConfigService } from "@nestjs/config";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AuthModule,
    new FastifyAdapter(),
  );

  const configService = app.get(ConfigService);
  const USER = configService.get("RABBITMQ_USER");
  const PASS = configService.get("RABBITMQ_PASS");
  const HOST = configService.get("RABBITMQ_HOST");
  const QUEUE = configService.get("RABBITMQ_AUTH_QUEUE");

  console.log(`amqp://${USER}:${PASS}@${HOST}`);
  

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${USER}:${PASS}@${HOST}`],
      noAck: false,
      queue: QUEUE,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.startAllMicroservices();
}
bootstrap();
