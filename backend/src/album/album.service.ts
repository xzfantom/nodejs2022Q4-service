import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AlbumService {
  constructor(private dbService: DbService) {}
  async create(createAlbumDto: CreateAlbumDto) {
    return await this.dbService.createAlbum(createAlbumDto);
  }

  async findAll() {
    return await this.dbService.findAllAlbums();
  }

  async findOne(id: string) {
    return await this.dbService.findOneAlbum(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return await this.dbService.updateAlbum(id, updateAlbumDto);
  }

  async remove(id: string) {
    await this.dbService.removeAlbum(id);
  }
}
