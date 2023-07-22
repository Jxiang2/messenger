import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy, RmqRecordBuilder } from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(
    @Inject("AUTH_SERVICE") private readonly authService: ClientProxy,
  ) {}

  @Get()
  async getUser() {
    const payload = new RmqRecordBuilder("Hello").build();
    return this.authService.send({ cmd: "get-user" }, payload);
  }
}
