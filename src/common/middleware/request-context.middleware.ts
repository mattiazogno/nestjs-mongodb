import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestId = randomUUID();
    const correlationId = (req.headers['x-correlation-id'] as string) || requestId;

    // Mettiamo nel request → lo leggono logger, interceptors, services
    req['context'] = { requestId, correlationId };

    // Header di risposta (molto utile per frontend/debug)
    res.setHeader('X-Request-ID', requestId);
    res.setHeader('X-Correlation-ID', correlationId);

    // Logging grezzo iniziale (stile access log)
    const start = Date.now();
    res.on('finish', () => {
      console.log(
        `Middleware: ${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms ` +
        `- correlationId=${correlationId}`,
      );
    });

    next();
  }
}