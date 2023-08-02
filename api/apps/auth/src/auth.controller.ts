import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from "@nestjs/microservices";
import { RmqService } from "@app/shared/rmq/rmq.service";

@Controller()
export class AuthController {
  constructor(
    readonly authService: AuthService,
    readonly rmqService: RmqService,
  ) {}

  @MessagePattern({ cmd: "get-users" })
  async getUser(@Payload() data: string, @Ctx() ctx: RmqContext) {
    this.rmqService.ackMessage(ctx);
    return this.authService.getUsers();
  }

  @MessagePattern({ cmd: "post-user" })
  async postUser(@Payload() data: string, @Ctx() ctx: RmqContext) {
    this.rmqService.ackMessage(ctx);
    return await this.authService.postUser();
  }
}
