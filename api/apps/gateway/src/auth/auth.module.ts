import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AUTH_SERVICE } from "./auth.config";

@Module({
  controllers: [AuthController],
  providers: [AUTH_SERVICE.PROVIDER],
})
export class AuthModule {}
