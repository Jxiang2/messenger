import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";

const NAME = "AUTH_SERVICE";

const AUTH_SERVICE_PROVIDER: Provider = {
  provide: NAME,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const USER = configService.get("RABBITMQ_USER");
    const PASS = configService.get("RABBITMQ_PASS");
    const HOST = configService.get("RABBITMQ_HOST");
    const QUEUE = configService.get("RABBITMQ_AUTH_QUEUE");
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${USER}:${PASS}@${HOST}`],
        queue: QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    });
  },
};

export const AUTH_SERVICE = {
  NAME: NAME,
  PROVIDER: AUTH_SERVICE_PROVIDER,
}; 
