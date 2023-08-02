import { Module } from "@nestjs/common";
import { PresenceController } from "./presence.controller";
import { PresenceService } from "./presence.service";
import { RmqModule } from "@app/shared";

@Module({
  imports: [RmqModule],
  controllers: [PresenceController],
  providers: [PresenceService],
})
export class PresenceModule {}
