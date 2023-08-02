import { Controller } from "@nestjs/common";
import { PresenceService } from "./presence.service";
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from "@nestjs/microservices";
import { RmqService } from "@app/shared/rmq/rmq.service";

@Controller("presence")
export class PresenceController {
  constructor(
    readonly presenceService: PresenceService,
    readonly rmqService: RmqService,
  ) {}

  @MessagePattern({ cmd: "get-presences" })
  async getUser(@Payload() data: string, @Ctx() ctx: RmqContext) {
    this.rmqService.ackMessage(ctx);

    return this.presenceService.getPresences();
  }
}
