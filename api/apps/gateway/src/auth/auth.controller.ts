import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseFilters,
} from "@nestjs/common";
import { ClientProxy, RmqRecordBuilder } from "@nestjs/microservices";
import { RMQ_SERVICE } from "@app/shared/rmq/constant";
import { RegisterUserDto } from "@app/shared/dto/user.dto";
import { GwExceptionFilter } from "@app/shared/response/gw-exception.filter";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject(RMQ_SERVICE.AUTH_SERVICE) readonly authService: ClientProxy,
  ) {}

  @Get()
  getUsers() {
    const payload = new RmqRecordBuilder("Hello").build();
    return this.authService.send({ cmd: "get-users" }, payload);
  }

  @Post("/register")
  @UseFilters(GwExceptionFilter)
  register(@Body() newUser: RegisterUserDto) {
    const payload = new RmqRecordBuilder<RegisterUserDto>()
      .setData(newUser)
      .build();

    return this.authService.send({ cmd: "register" }, payload);
  }
}
