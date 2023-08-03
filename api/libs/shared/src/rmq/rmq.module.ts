import { DynamicModule, Module, Provider } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientProxyFactory, Transport } from "@nestjs/microservices";
import { RMQ_SERVICE_QUEUE } from "@app/shared/rmq/constant";
import { RmqService } from "@app/shared/rmq/rmq.service";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" })],
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static registerRmq(service: keyof typeof RMQ_SERVICE_QUEUE): DynamicModule {
    const provider: Provider = {
      // Name of the service
      provide: service,

      // Dependencies that the service needs
      inject: [ConfigService],

      // Factory function that returns the service(provider)
      useFactory: (configService: ConfigService) => {
        const USER = configService.get("RABBITMQ_USER");
        const PASS = configService.get("RABBITMQ_PASS");
        const HOST = configService.get("RABBITMQ_HOST");
        const QUEUE = configService.get(RMQ_SERVICE_QUEUE[service]);

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

    return {
      module: RmqModule,
      providers: [provider],
      exports: [provider],
    };
  }
}
