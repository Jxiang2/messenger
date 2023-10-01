import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { PresenceModule } from "./presence.module";
import { RmqService } from "@app/shared/rmq/rmq.service";
import { MsExceptionFilter } from "@app/shared/response/ms-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    PresenceModule,
    new FastifyAdapter(),
  );

  const rmqService = app.get(RmqService);

  app.useGlobalFilters(new MsExceptionFilter());
  app.connectMicroservice(rmqService.getRmqServiceConfig("PRESENCE_SERVICE"));

  await app.startAllMicroservices();
}

bootstrap();
