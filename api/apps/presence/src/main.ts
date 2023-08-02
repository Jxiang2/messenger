import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { PresenceModule } from "./presence.module";
import { RmqService } from "@app/shared/rmq/rmq.service";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    PresenceModule,
    new FastifyAdapter(),
  );

  const rmqService = app.get(RmqService);

  app.connectMicroservice(rmqService.getRmqServiceConfig("PRESENCE_SERVICE"));

  await app.startAllMicroservices();
}

bootstrap();
