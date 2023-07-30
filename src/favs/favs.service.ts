import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackService } from '../track/track.service';
import { Fav } from './entities/fav.entity';

const favs: Fav = {
  tracks: [],
  albums: [],
  artists: [],
};
@Injectable()
export class FavsService {
  constructor(private trackService: TrackService) {}

  findAll() {
    return `This action returns all favs`;
  }

  async addTrack(id: string) {
    const track = await this.trackService.findOne(id);
    favs.tracks.push(track.id);
    return true;
  }

  removeTrack(id: string) {
    const track = favs.tracks.find((track) => track === id);
    if (!track) {
      throw new NotFoundException();
    }
    const index = favs.tracks.indexOf(track);
    favs.tracks.splice(index, 1);

    return true;
  }

  addAlbum(id: string) {
    return 'This action adds a new fav';
  }

  removeAlbum(id: string) {
    return `This action removes a #${id} fav`;
  }

  addArtist(id: string) {
    return 'This action adds a new fav';
  }

  removeArtist(id: string) {
    return `This action removes a #${id} fav`;
  }
}
