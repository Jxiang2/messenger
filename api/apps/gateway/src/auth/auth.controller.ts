import { Controller, Get, Inject, Post } from "@nestjs/common";
import { ClientProxy, RmqRecordBuilder } from "@nestjs/microservices";
import { RMQ_SERVICE } from "@app/shared/rmq/constant";

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

  @Post()
  postUser() {
    const payload = new RmqRecordBuilder("Hello").build();
    return this.authService.send({ cmd: "post-user" }, payload);
  }
}
