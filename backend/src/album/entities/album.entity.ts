import { Exclude } from 'class-transformer';

export class Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist

  @Exclude()
  isFav: boolean;

  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
