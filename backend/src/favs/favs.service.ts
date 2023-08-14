import { Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';

@Injectable()
export class FavsService {
  constructor(private dbService: DbService) {}

  async findAll() {
    return this.dbService.findAllFavs();
  }

  async addTrack(id: string) {
    return this.dbService.addTrackFav(id);
  }

  removeTrack(id: string) {
    return this.dbService.removeTrackFav(id);
  }

  addAlbum(id: string) {
    return this.dbService.addAlbumFav(id);
  }

  removeAlbum(id: string) {
    return this.dbService.removeAlbumFav(id);
  }

  async addArtist(id: string) {
    return this.dbService.addArtistFav(id);
  }

  removeArtist(id: string) {
    return this.dbService.removeArtistFav(id);
  }
}
