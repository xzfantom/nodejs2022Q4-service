import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 } from 'uuid';

const albums: Album[] = [];
@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const album = {
      id: v4(),
      ...createAlbumDto,
    };
    albums.push(album);

    return album;
  }

  findAll() {
    return albums;
  }

  findOne(id: string) {
    const album = albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    Object.assign(album, updateAlbumDto);
    return album;
  }

  remove(id: string) {
    const album = albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException();
    }

    const index = albums.indexOf(album);
    albums.splice(index, 1);
  }
}
