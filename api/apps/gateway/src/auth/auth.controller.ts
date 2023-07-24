import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy, RmqRecordBuilder } from "@nestjs/microservices";
import { AUTH_SERVICE } from "./auth.config";

@Controller()
export class AuthController {
  constructor(@Inject(AUTH_SERVICE.NAME) readonly authService: ClientProxy) {}

  @Get()
  getUser() {
    const payload = new RmqRecordBuilder("Hello").build();
    const result = this.authService.send<{ user: string }>(
      { cmd: "get-user" },
      payload,
    );

    return result;
  }
}
