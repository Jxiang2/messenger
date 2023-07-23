import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AUTH_SERVICE_PROVIDER } from "./auth.config";

@Module({
  controllers: [AuthController],
  providers: [AUTH_SERVICE_PROVIDER],
})
export class AuthModule {}
