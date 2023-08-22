import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLoggerService } from './logger/mylogger.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private logger: MyLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log('Request', req);
    res.on('finish', () => {
      this.logger.log('Response', res);
    });

    next();
  }
}
