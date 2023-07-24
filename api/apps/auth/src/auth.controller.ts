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
  constructor(readonly authSerivce: AuthService) {}

  @MessagePattern({ cmd: "get-user" })
  getUser(@Payload() data: string, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();
    channel.ack(message);

    return { user: "Hello World" };
  }
}
