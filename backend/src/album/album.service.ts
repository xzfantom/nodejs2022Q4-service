import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AlbumService {
  constructor(private dbService: DbService) {}
  create(createAlbumDto: CreateAlbumDto) {
    return this.dbService.createAlbum(createAlbumDto);
  }

  findAll() {
    return this.dbService.findAllAlbums();
  }

  findOne(id: string) {
    return this.dbService.findOneAlbum(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.dbService.updateAlbum(id, updateAlbumDto);
  }

  remove(id: string) {
    this.dbService.removeAlbum(id);
  }
}
