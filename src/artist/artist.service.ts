import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 } from 'uuid';
import { Artist } from './entities/artist.entity';

const artists: Artist[] = [];
@Injectable()
export class ArtistService {
  async create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: v4(),
      ...createArtistDto,
    };
    artists.push(artist);
    return artist;
  }

  async findAll() {
    return artists;
  }

  async findOne(id: string) {
    const artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);
    Object.assign(artist, updateArtistDto);
    return artist;
  }

  async remove(id: string) {
    const artist = await this.findOne(id);

    const index = artists.indexOf(artist);
    artists.splice(index, 1);

    return true;
  }
}
