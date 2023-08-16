import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DbModule } from '../db/db.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [DbModule],
})
export class TrackModule {}
