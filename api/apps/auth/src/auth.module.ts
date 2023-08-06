import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule, ResponseModule, RmqModule } from "@app/shared";
import { MsExceptionFilter } from "@app/shared/response/ms-exception.filter";

@Module({
  imports: [RmqModule, PrismaModule, ResponseModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: "MS_EXCEPTION_FILTER", useClass: MsExceptionFilter },
  ],
})
export class AuthModule {}
