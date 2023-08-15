import { Injectable, LogLevel, LoggerService } from '@nestjs/common';

const logLevels: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose'];

@Injectable()
export class MyLoggerService implements LoggerService {
  private logLevel: LogLevel = 'log';
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    if (logLevels.indexOf(this.logLevel) >= logLevels.indexOf('log')) {
      console.log('LOG', message, optionalParams);
    }
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    if (logLevels.indexOf(this.logLevel) >= logLevels.indexOf('error')) {
      console.error('ERROR', message, optionalParams);
    }
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    if (logLevels.indexOf(this.logLevel) >= logLevels.indexOf('warn')) {
      console.warn('WARN', message, optionalParams);
    }
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    if (logLevels.indexOf(this.logLevel) >= logLevels.indexOf('debug')) {
      console.log('DEBUG', message, optionalParams);
    }
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    if (logLevels.indexOf(this.logLevel) >= logLevels.indexOf('verbose')) {
      console.log('VERBOSE', message, optionalParams);
    }
  }
}
