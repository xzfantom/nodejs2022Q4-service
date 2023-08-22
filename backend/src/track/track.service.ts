import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class TrackService {
  constructor(private dbService: DbService) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.dbService.createTrack(createTrackDto);
  }

  async findAll() {
    return await this.dbService.findAllTracks();
  }

  async findOne(id: string) {
    return await this.dbService.findOneTrack(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    return await this.dbService.updateTrack(id, updateTrackDto);
  }

  async remove(id: string) {
    await this.dbService.removeTrack(id);
  }
}
