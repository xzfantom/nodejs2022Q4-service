import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [DbService],
  exports: [DbService],
  imports: [PrismaModule],
})
export class DbModule {}
