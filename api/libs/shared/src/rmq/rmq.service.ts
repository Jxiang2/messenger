import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { RmqContext, Transport } from "@nestjs/microservices";
import { RMQ_SERVICE_QUEUE } from "@app/shared/rmq/constant";

@Injectable()
export class RmqService {
  constructor(readonly configService: ConfigService) {}

  getRmqServiceConfig(service: keyof typeof RMQ_SERVICE_QUEUE) {
    const USER = this.configService.get("RABBITMQ_USER");
    const PASS = this.configService.get("RABBITMQ_PASS");
    const HOST = this.configService.get("RABBITMQ_HOST");
    const QUEUE = this.configService.get(RMQ_SERVICE_QUEUE[service]);

    return {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${USER}:${PASS}@${HOST}`],
        noAck: false,
        queue: QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    };
  }

  ackMessage(ctx: RmqContext): void {
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();
    channel.ack(message);
  }
}
