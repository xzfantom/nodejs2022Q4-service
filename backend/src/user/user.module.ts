import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbModule } from '../db/db.module';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [DbModule, LoggerModule],
})
export class UserModule {}
