import { HttpStatus } from "@nestjs/common";

export type MsFailureResponse = {
  status: HttpStatus;
  message: string;
  rmq: { cmd: string };
  args: Record<string, any>;
  type: "rpc";
};

export type GeneralFailureObject = {
  response: {
    statusCode: HttpStatus;
    message: [string];
    error: string;
  };
};

export type GwSuccessResponse<T extends Record<string, any>> = {
  ok: true;
  status: HttpStatus.OK;
  data: T;
};

export type GwFailureResponse = {
  ok: false;
  status: HttpStatus;
  message: string[];
};
