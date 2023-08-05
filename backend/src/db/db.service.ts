import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { warn } from 'console';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { Album } from 'src/album/entities/album.entity';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { Artist } from 'src/artist/entities/artist.entity';
import { Fav } from 'src/favs/entities/fav.entity';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { Track } from 'src/track/entities/track.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';
import { v4 } from 'uuid';

const users: User[] = [];
const tracks: Track[] = [];
const artists: Artist[] = [];
const albums: Album[] = [];

const favs: Fav = {
  tracks: [],
  albums: [],
  artists: [],
};

@Injectable()
export class DbService {
  createUser(createUserDto: CreateUserDto) {
    const user = {
      id: v4(),
      ...createUserDto,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };
    users.push(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  findAllUsers() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...result }) => result);
  }

  findOneUser(id: string) {
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    if (user.password === updateUserDto.oldPassword) {
      user.password = updateUserDto.newPassword;
      user.updatedAt = Date.now();
      user.version++;
    } else {
      throw new ForbiddenException();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  removeUser(id: string) {
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
  }

  // Tracks

  async createTrack(createTrackDto: CreateTrackDto) {
    const track = {
      id: v4(),
      ...createTrackDto,
    };
    tracks.push(track);

    return track;
  }

  async findAllTracks() {
    return tracks;
  }

  async findOneTrack(id: string) {
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException();
    }
    Object.assign(track, updateTrackDto);
    return track;
  }

  async removeTrack(id: string) {
    const user = tracks.find((track) => track.id === id);
    if (!user) {
      throw new NotFoundException();
    }

    try {
      await this.removeTrackFav(id);
    } catch (error) {
      warn(error);
    }

    const index = tracks.indexOf(user);
    tracks.splice(index, 1);
  }

  async removeArtistFromTracks(id: string) {
    const track = tracks.map((track) =>
      track.artistId === id ? { ...track, artistId: null } : track,
    );

    tracks.splice(0, tracks.length, ...track);
  }

  async removeAlbumFromTracks(id: string) {
    const track = tracks.map((track) =>
      track.albumId === id ? { ...track, albumId: null } : track,
    );

    tracks.splice(0, tracks.length, ...track);
  }

  // Artists

  async createArtist(createArtistDto: CreateArtistDto) {
    const artist = {
      id: v4(),
      ...createArtistDto,
    };
    artists.push(artist);
    return artist;
  }

  async findAllArtists() {
    return artists;
  }

  async findOneArtist(id: string) {
    const artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOneArtist(id);
    Object.assign(artist, updateArtistDto);
    return artist;
  }

  async removeArtist(id: string) {
    const artist = await this.findOneArtist(id);

    try {
      await this.removeArtistFav(id);
    } catch (error) {
      console.warn(error);
    }

    try {
      await this.removeArtistFromTracks(id);
    } catch (error) {
      console.warn(error);
    }

    try {
      await this.removeArtistFromAlbums(id);
    } catch (error) {
      console.warn(error);
    }

    const index = artists.indexOf(artist);
    artists.splice(index, 1);

    return true;
  }

  // Albums

  createAlbum(createAlbumDto: CreateAlbumDto) {
    const album = {
      id: v4(),
      ...createAlbumDto,
    };
    albums.push(album);

    return album;
  }

  findAllAlbums() {
    return albums;
  }

  findOneAlbum(id: string) {
    const album = albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException();
    }
    Object.assign(album, updateAlbumDto);
    return album;
  }

  removeAlbum(id: string) {
    const album = albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException();
    }

    try {
      this.removeAlbumFromTracks(id);
    } catch (error) {
      console.warn(error);
    }

    try {
      this.removeAlbumFav(id);
    } catch (error) {
      console.warn(error);
    }

    const index = albums.indexOf(album);
    albums.splice(index, 1);
  }

  removeArtistFromAlbums = async (id: string) => {
    const album = albums.map((album) =>
      album.artistId === id ? { ...album, artistId: null } : album,
    );

    albums.splice(0, albums.length, ...album);
  };

  // Favs
  async findAllFavs() {
    const favsDto = {
      tracks: [],
      albums: [],
      artists: [],
    };
    favs.tracks.forEach(async (trackId) => {
      const track = await this.findOneTrack(trackId);
      favsDto.tracks.push(track);
    });
    favs.albums.forEach((albumId) => {
      const album = this.findOneAlbum(albumId);
      favsDto.albums.push(album);
    });
    favs.artists.forEach(async (artistId) => {
      const artist = await this.findOneArtist(artistId);
      favsDto.artists.push(artist);
    });

    return favsDto;
  }

  async addTrackFav(id: string) {
    try {
      const track = await this.findOneTrack(id);
      favs.tracks.push(track.id);
    } catch (error) {
      throw new UnprocessableEntityException();
    }

    return true;
  }

  removeTrackFav(id: string) {
    const track = favs.tracks.find((track) => track === id);
    if (!track) {
      throw new NotFoundException();
    }
    const index = favs.tracks.indexOf(track);
    favs.tracks.splice(index, 1);

    return true;
  }

  addAlbumFav(id: string) {
    try {
      const album = this.findOneAlbum(id);
      favs.albums.push(album.id);
    } catch (error) {
      throw new UnprocessableEntityException();
    }

    return true;
  }

  removeAlbumFav(id: string) {
    const album = favs.albums.find((album) => album === id);
    if (!album) {
      throw new NotFoundException();
    }
    const index = favs.albums.indexOf(album);
    favs.albums.splice(index, 1);

    return true;
  }

  async addArtistFav(id: string) {
    try {
      const artist = await this.findOneArtist(id);
      favs.artists.push(artist.id);
    } catch (error) {
      throw new UnprocessableEntityException();
    }
    return true;
  }

  removeArtistFav(id: string) {
    const artist = favs.artists.find((artist) => artist === id);
    if (!artist) {
      throw new NotFoundException();
    }
    const index = favs.artists.indexOf(artist);
    favs.artists.splice(index, 1);

    return true;
  }
}
