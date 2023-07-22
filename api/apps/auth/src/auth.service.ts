import { Injectable } from "@nestjs/common";
import { Ctx, MessagePattern, RmqContext } from "@nestjs/microservices";

@Injectable()
export class AuthService {
  getHello(): string {
    return "Hello World!";
  }

  @MessagePattern({ cmd: "get-user" })
  async getUser(@Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();
    channel.ack(message);

    return { user: "USER" };
  }
}
