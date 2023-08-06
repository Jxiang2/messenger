import {
  Catch,
  RpcExceptionFilter,
  ArgumentsHost,
  Logger,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { RpcException } from "@nestjs/microservices";

@Catch(RpcException)
export class MsExceptionFilter implements RpcExceptionFilter<RpcException> {
  private readonly logger = new Logger(MsExceptionFilter.name);
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    this.logger.log("ERROR: ", exception.getError());
    console.log("ERROR: ", exception.getError());

    const args = host.getArgs();
    const type = host.getType();

    this.logger.log(args);
    this.logger.log(type);

    return throwError(() => exception.getError());
  }
}
