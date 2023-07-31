import { Controller, Get, Inject, Post } from "@nestjs/common";
import { ClientProxy, RmqRecordBuilder } from "@nestjs/microservices";
import { AUTH_SERVICE } from "./auth.config";

@Controller("auth")
export class AuthController {
  constructor(@Inject(AUTH_SERVICE.NAME) readonly authService: ClientProxy) {}

  @Get()
  getUsers() {
    const payload = new RmqRecordBuilder("Hello").build();
    return this.authService.send<string>({ cmd: "get-users" }, payload);
  }

  @Post()
  postUser() {
    const payload = new RmqRecordBuilder("Hello").build();
    return this.authService.send<string>({ cmd: "post-user" }, payload);
  }
}
