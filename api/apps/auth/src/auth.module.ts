import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule, ResponseModule, RmqModule } from "@app/shared";

@Module({
  imports: [RmqModule, PrismaModule, ResponseModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
