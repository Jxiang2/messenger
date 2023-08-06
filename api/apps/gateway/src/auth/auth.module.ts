import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { RmqModule } from "@app/shared";
import { GwExceptionFilter } from "@app/shared/response/gw-exception.filter";

@Module({
  imports: [RmqModule.registerRmq("AUTH_SERVICE")],
  controllers: [AuthController],
  providers: [{ provide: "GW_EXCEPTION_FILTER", useClass: GwExceptionFilter }],
})
export class AuthModule {}
