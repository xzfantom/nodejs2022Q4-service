import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4, validate } from 'uuid';

const tracks: Track[] = [];

@Injectable()
export class TrackService {
  async create(createTrackDto: CreateTrackDto) {
    const track = {
      id: v4(),
      ...createTrackDto,
    };
    tracks.push(track);

    return track;
  }

  async findAll() {
    return tracks;
  }

  async findOne(id: string) {
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    Object.assign(track, updateTrackDto);
    return track;
  }

  async remove(id: string) {
    const user = tracks.find((track) => track.id === id);
    if (!user) {
      throw new NotFoundException();
    }

    const index = tracks.indexOf(user);
    tracks.splice(index, 1);
  }
}
