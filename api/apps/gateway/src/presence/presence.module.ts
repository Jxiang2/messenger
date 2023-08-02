import { Module } from "@nestjs/common";
import { PresenceController } from "./presence.controller";
import { RmqModule } from "@app/shared";

@Module({
  imports: [RmqModule.registerRmq("PRESENCE_SERVICE")],
  controllers: [PresenceController],
})
export class PresenceModule {}
