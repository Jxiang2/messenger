import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { GwFailureResponse, MsFailureResponse } from "./types";
export class GwExceptionFilter implements ExceptionFilter {
  catch(exception: MsFailureResponse, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    // @ts-ignore
    const generalExceptionObject = exception.response;
    const status = generalExceptionObject?.statusCode;
    const message = generalExceptionObject?.message;

    const exceptionObject: GwFailureResponse = {
      ok: false,
      status: generalExceptionObject ? status : exception.status,
      message: generalExceptionObject ? message : [exception.message],
    };

    response.send({
      ...exceptionObject,
      timestamp: new Date().toISOString(),
    });
  }
}
