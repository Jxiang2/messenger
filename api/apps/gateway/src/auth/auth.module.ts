import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { RmqModule } from "@app/shared";

@Module({
  imports: [RmqModule.registerRmq("AUTH_SERVICE")],
  controllers: [AuthController],
})
export class AuthModule {}
