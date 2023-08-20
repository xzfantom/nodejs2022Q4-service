import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { log } from 'console';
import { dump } from 'js-yaml';
import { MyLoggerService } from './logger/mylogger.service';
import { MyExceptionFilter } from './my-exception.filter';
import { LogLevel } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  const loggerService = app.get(MyLoggerService);
  const LOG_LEVEL = configService.get<LogLevel>('LOG_LEVEL') || 'log';
  const LOG_TO_FILE = configService.get<string>('LOG_TO_FILE') == 'true';
  const LOG_TO_CONSOLE = configService.get<string>('LOG_TO_CONSOLE') == 'true';
  const LOG_FILE_LIMIT = configService.get<number>('LOG_FILE_LIMIT') || 2;
  loggerService.setConfig(
    LOG_LEVEL,
    LOG_TO_CONSOLE,
    LOG_TO_FILE,
    LOG_FILE_LIMIT,
  );

  app.useLogger(app.get(MyLoggerService));

  app.useGlobalFilters(new MyExceptionFilter(loggerService));

  process.on('uncaughtException', (err) => {
    loggerService.error(err.message, 'uncaughtException');
  });

  process.on('unhandledRejection', (reason, promise) => {
    loggerService.error(reason, 'unhandledRejection');
  });

  const PORT = configService.get<number>('PORT') || 4000;

  const config = new DocumentBuilder()
    .setTitle('Library API')
    .setDescription('A Library API with CRUD functionality')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.use('/doc/yaml', (req, res) => {
    res.type('text/yaml');
    res.send(dump(document));
  });

  log(`Server running on http://localhost:${PORT}/`);
  log(`Swagger running on http://localhost:${PORT}/doc/`);

  await app.listen(PORT);
}
bootstrap();
