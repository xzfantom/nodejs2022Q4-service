import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class ArtistService {
  constructor(private dbService: DbService) {}
  async create(createArtistDto: CreateArtistDto) {
    return await this.dbService.createArtist(createArtistDto);
  }

  async findAll() {
    return await this.dbService.findAllArtists();
  }

  async findOne(id: string) {
    return await this.dbService.findOneArtist(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    return await this.dbService.updateArtist(id, updateArtistDto);
  }

  async remove(id: string) {
    await this.dbService.removeArtist(id);
  }
}
