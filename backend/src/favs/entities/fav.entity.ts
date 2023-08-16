import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Track } from '../../track/entities/track.entity';

export class Fav {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export class FavDto {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
