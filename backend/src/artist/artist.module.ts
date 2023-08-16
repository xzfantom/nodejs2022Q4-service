import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DbModule } from '../db/db.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [DbModule],
})
export class ArtistModule {}
