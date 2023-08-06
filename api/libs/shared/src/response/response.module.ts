import { Module } from "@nestjs/common";
import { MsResponseService } from "@app/shared/response/ms-response.service";
import { GwResponseService } from "@app/shared/response/gw-response.service";

@Module({
  exports: [MsResponseService, GwResponseService],
  providers: [MsResponseService, GwResponseService],
})
export class ResponseModule {}
