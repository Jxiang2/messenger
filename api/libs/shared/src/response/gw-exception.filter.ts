import { ArgumentsHost, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { UnkwonFailureResponse, MsFailureResponse } from "./types";

export class GwExceptionFilter implements ExceptionFilter {
  catch(
    exception: UnkwonFailureResponse | MsFailureResponse,
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

    response.status(status).send({
      ok: false,
      status: status,
      message: message,
      url: request.url,
    } as Partial<UnkwonFailureResponse>);
  }
}
