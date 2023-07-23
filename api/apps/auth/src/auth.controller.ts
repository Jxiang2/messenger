import { Controller, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from "@nestjs/microservices";

@Controller()
export class AuthController {
  constructor(private readonly authSerivce: AuthService) {}

  @MessagePattern({ cmd: "get-user" })
  async getUser(@Payload() data: string, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();

    channel.ack(message);

    return { user: "Hello World!" };
  }
}
