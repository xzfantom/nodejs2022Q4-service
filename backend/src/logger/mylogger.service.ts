import { Injectable, LogLevel, LoggerService } from '@nestjs/common';
import { writeToFile } from 'src/utils/writeToFile';

const logLevels: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose'];

const parseParams = (optionalParams: any[]) => {
  const info: string[] = [];
  optionalParams.forEach((param) => {
    if (typeof param === 'object') {
      if ('url' in param && 'body' in param && 'params' in param) {
        info.push(
          `url: ${param.url}, body: ${JSON.stringify(
            param.body,
          )}, params: ${JSON.stringify(param.params)}`,
        );
      } else if ('status' in param) {
        info.push(`status: ${param.statusCode}`);
      } else {
        info.push(JSON.stringify(param));
      }
    } else {
      info.push(param);
    }
  });
  return info.join(', ');
};

@Injectable()
export class MyLoggerService implements LoggerService {
  private logLevel: LogLevel = 'log';
  private logToConsole = true;
  private logToFile = false;
  private fileSizeLimit = 1000000;

  setConfig(ll: LogLevel, ltc: boolean, ltf: boolean, fsl: number) {
    this.logLevel = ll;
    this.logToConsole = ltc;
    this.logToFile = ltf;
    this.fileSizeLimit = fsl;

    this.log(
      `Logger configured: logLevel: ${ll}, logToConsole: ${ltc}, logToFile: ${ltf}, fileSizeLimit: ${fsl}`,
    );
  }

  writeLog(level: LogLevel, message: string, ...optionalParams: any[]) {
    if (logLevels.indexOf(this.logLevel) >= logLevels.indexOf(level)) {
      const info = parseParams(optionalParams);
      const output = `[${level.toLocaleUpperCase()}] ${message} : ${info}`;

      if (this.logToConsole) console.log(output);
      if (this.logToFile) {
        writeToFile('./log/all.log', output, this.fileSizeLimit);
      }
      if (this.logToFile && level === 'error') {
        writeToFile('./log/error.log', output, this.fileSizeLimit);
      }
    }
  }
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    this.writeLog('log', message, ...optionalParams);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    this.writeLog('error', message, ...optionalParams);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    this.writeLog('warn', message, ...optionalParams);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]) {
    this.writeLog('debug', message, ...optionalParams);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]) {
    this.writeLog('verbose', message, ...optionalParams);
  }
}
