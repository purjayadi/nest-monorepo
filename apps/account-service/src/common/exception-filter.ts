// Dependencies
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Prisma } from "@tech-sharing/account-schema";
import { Observable, catchError } from "rxjs";

@Injectable()
export default class ExceptionFilter implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const isDev = process.env.APP_ENV !== 'production';
    const exception = context.switchToRpc().getContext();
    return next.handle().pipe(
      catchError((err) => {
        switch (err.code) {
          case 'P2002' && err instanceof Prisma.PrismaClientKnownRequestError : {
            throw new RpcException({
              statusCode: HttpStatus.CONFLICT,
              error: isDev ? exception.message : 'DUPLICATE',
              // message: `Duplicate data was detected for the ${exception.meta.target} field`,
              message: `Duplicate data was detected for the  field`,
            });
          }
          
          default:
            throw new RpcException({
              statusCode: HttpStatus.CONFLICT,
              error: isDev ? exception.message : 'DUPLICATE',
              // message: `Duplicate data was detected for the ${exception.meta.target} field`,
              message: `Duplicate data was detected for the  field`,
            });
        }
      })
    );
  }
}