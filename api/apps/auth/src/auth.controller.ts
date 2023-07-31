import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from "@nestjs/microservices";

@Controller()
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @MessagePattern({ cmd: "get-users" })
  async getUser(@Payload() data: string, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();
    channel.ack(message);

    return this.authService.getUsers();
  }

  @MessagePattern({ cmd: "post-user" })
  async postUser(@Payload() data: string, @Ctx() ctx: RmqContext) {
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();
    channel.ack(message);

    return await this.authService.postUser();
  }
}
