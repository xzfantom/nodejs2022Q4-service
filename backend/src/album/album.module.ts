import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [DbModule],
})
export class AlbumModule {}
