import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('LoggingInterceptor');

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const req = ctx.switchToHttp().getRequest();
    const { method, url } = req;
    const now = Date.now();

    this.logger.log(`→ ${method} ${url}`);

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;
        this.logger.log(`← ${method} ${url} - ${duration}ms`);
      }),
    );
  }
}