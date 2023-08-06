import { HttpStatus, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { GwSuccessResponse } from "@app/shared/response/types";

@Injectable()
export class ResponseService {
  success<T extends Record<string, any>>(data: T): GwSuccessResponse<T> {
    return {
      ok: true,
      status: HttpStatus.OK,
      data,
    };
  }

  fail(status: HttpStatus, message: string) {
    throw new RpcException({ status, message });
  }
}
