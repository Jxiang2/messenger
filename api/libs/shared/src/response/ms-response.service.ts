import { Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

enum MsStatus {
  Success = "Success",
  Failure = "Failure",
}

interface MsSuccessResponse<T> {
  status: MsStatus;
  data: T;
}

export interface MsFailureResponse {
  status: MsStatus;
  message: string;
}

export type MsResponse<T> = MsSuccessResponse<T> | MsFailureResponse;

@Injectable()
export class MsResponseService {
  success<T>(data: T): MsSuccessResponse<T> {
    return { status: MsStatus.Success, data };
  }

  fail(message: string) {
    throw new RpcException({ status: MsStatus.Failure, message });
  }
}
