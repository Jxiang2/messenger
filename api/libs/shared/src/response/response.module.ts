import { Module } from "@nestjs/common";
import { ResponseService } from "@app/shared/response/response.service";

@Module({
  exports: [ResponseService],
  providers: [ResponseService],
})
export class ResponseModule {}
