import { Catch, RpcExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { RpcException } from "@nestjs/microservices";
import { MsFailureResponse } from "./types";

@Catch(RpcException)
export class MsExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const args = host.getArgByIndex(0);
    const message = host.getArgByIndex(1).args[2];
    const type = host.getType();

    return throwError(
      () =>
        ({
          ...(exception.getError() as object),
          rmq: message,
          args,
          type,
        } as MsFailureResponse),
    );
  }
}
