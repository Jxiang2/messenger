import { Controller, Get, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy, RmqRecordBuilder } from "@nestjs/microservices";

@Controller()
export class AuthController {
  constructor(
    @Inject("AUTH_SERVICE") private readonly authService: ClientProxy,
  ) {}

  @Get()
  async getUser() {
    const payload = new RmqRecordBuilder("Hello").build();
    return this.authService.send({ cmd: "get-user" }, payload);
  }
}
