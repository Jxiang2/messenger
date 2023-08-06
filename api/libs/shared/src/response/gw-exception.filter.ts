import { ArgumentsHost, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { GeneralFailureResponse, MsFailureResponse } from "./types";

export class GwExceptionFilter implements ExceptionFilter {
  catch(
    exception: MsFailureResponse | GeneralFailureResponse,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();

    let status: HttpStatus;
    let message: string[];

    if (exception.type === "general") {
      status = exception.response.statusCode;
      message = exception.response.message;
    } else {
      status = exception.status;
      message = exception.message;
    }

    response.send({
      ok: false,
      status: status,
      message: message,
      url: request.url,
    } as Partial<GeneralFailureResponse>);
  }
}
