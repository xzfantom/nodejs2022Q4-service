import { Exclude } from 'class-transformer';
export class Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;

  @Exclude()
  isFav: boolean;

  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }
}
