import { Exclude } from 'class-transformer';

export class Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number

  @Exclude()
  isFav: boolean;

  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
}
