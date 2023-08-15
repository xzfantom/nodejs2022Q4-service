import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { log } from 'console';
import { dump } from 'js-yaml';
import { MyLoggerService } from './logger/mylogger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(MyLoggerService));

  const configService = app.get(ConfigService);

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
