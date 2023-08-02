import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy, RmqRecordBuilder } from "@nestjs/microservices";
import { RMQ_SERVICE } from "@app/shared/rmq/constant";

@Controller("presence")
export class PresenceController {
  constructor(
    @Inject(RMQ_SERVICE.PRESENCE_SERVICE) readonly presenceService: ClientProxy,
  ) {}

  @Get()
  getPresences() {
    const payload = new RmqRecordBuilder("Hello").build();
    return this.presenceService.send({ cmd: "get-presences" }, payload);
  }
}
