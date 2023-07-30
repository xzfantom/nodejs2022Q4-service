import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TrackService } from '../track/track.service';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [TrackService],
})
export class FavsModule {}
