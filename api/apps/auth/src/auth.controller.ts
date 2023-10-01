import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from "@nestjs/microservices";
import { RmqService } from "@app/shared/rmq/rmq.service";
import { RegisterUserDto } from "@app/shared/dto/user.dto";
import { ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common";

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    readonly authService: AuthService,
    readonly rmqService: RmqService,
  ) {}

  @MessagePattern({ cmd: "get-users" })
  async getUsers(@Payload() data: string, @Ctx() ctx: RmqContext) {
    this.rmqService.ackMessage(ctx);
    return this.authService.getUsers();
  }

  @MessagePattern({ cmd: "register" })
  async register(
    @Payload() registerUserDto: RegisterUserDto,
    @Ctx() ctx: RmqContext,
  ) {
    this.rmqService.ackMessage(ctx);
    return this.authService.register(registerUserDto);
  }
}
