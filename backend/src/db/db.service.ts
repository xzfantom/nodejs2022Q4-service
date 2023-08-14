import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { Album } from 'src/album/entities/album.entity';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { Fav } from 'src/favs/entities/fav.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { Track } from 'src/track/entities/track.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DbService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({ data: createUserDto });
      return user;
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  async findAllUsers() {
    return await this.prisma.user.findMany();
  }

  async findOneUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: User) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async removeUser(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException();
      }

      throw error;
    }
  }

  // Tracks

  async createTrack(createTrackDto: CreateTrackDto) {
    return await this.prisma.track.create({ data: createTrackDto });
  }

  async findAllTracks() {
    return await this.prisma.track.findMany();
  }

  async findOneTrack(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      return await this.prisma.track.update({
        where: { id },
        data: updateTrackDto,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException();
      }

      throw error;
    }
  }

  async removeTrack(id: string) {
    try {
      await this.prisma.track.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException();
      }

      throw error;
    }
  }

  // Artists

  async createArtist(createArtistDto: CreateArtistDto) {
    return this.prisma.artist.create({ data: createArtistDto });
  }

  async findAllArtists() {
    return this.prisma.artist.findMany();
  }

  async findOneArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      const artist = await this.prisma.artist.update({
        where: { id },
        data: updateArtistDto,
      });
      return artist;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException();
      }

      throw error;
    }
  }

  async removeArtist(id: string) {
    try {
      await this.prisma.artist.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException();
      }

      throw error;
    }
  }

  // Albums

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    return this.prisma.album.create({ data: createAlbumDto });
  }

  async findAllAlbums() {
    return this.prisma.album.findMany();
  }

  async findOneAlbum(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException();
    }
    return album;
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      const album = await this.prisma.album.update({
        where: { id },
        data: updateAlbumDto,
      });
      return album;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException();
      }

      throw error;
    }
  }

  async removeAlbum(id: string) {
    try {
      await this.prisma.album.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException();
      }

      throw error;
    }
  }

  // Favs
  async findAllFavs() {
    const favsDto = {
      tracks: [],
      albums: [],
      artists: [],
    };
    // favs.tracks.forEach(async (trackId) => {
    //   const track = await this.findOneTrack(trackId);
    //   favsDto.tracks.push(track);
    // });
    // favs.albums.forEach((albumId) => {
    //   const album = this.findOneAlbum(albumId);
    //   favsDto.albums.push(album);
    // });
    // favs.artists.forEach(async (artistId) => {
    //   const artist = await this.findOneArtist(artistId);
    //   favsDto.artists.push(artist);
    // });

    return favsDto;
  }

  async addTrackFav(id: string) {
    try {
      const track = await this.findOneTrack(id);
      // favs.tracks.push(track.id);
    } catch (error) {
      throw new UnprocessableEntityException();
    }

    return true;
  }

  removeTrackFav(id: string) {
    // const track = favs.tracks.find((track) => track === id);
    // if (!track) {
    //   throw new NotFoundException();
    // }
    // const index = favs.tracks.indexOf(track);
    // favs.tracks.splice(index, 1);

    return true;
  }

  async addAlbumFav(id: string) {
    // try {
    //   const album = await this.findOneAlbum(id);
    //   favs.albums.push(album.id);
    // } catch (error) {
    //   throw new UnprocessableEntityException();
    // }

    return true;
  }

  removeAlbumFav(id: string) {
    // const album = favs.albums.find((album) => album === id);
    // if (!album) {
    //   throw new NotFoundException();
    // }
    // const index = favs.albums.indexOf(album);
    // favs.albums.splice(index, 1);

    return true;
  }

  async addArtistFav(id: string) {
    // try {
    //   const artist = await this.findOneArtist(id);
    //   favs.artists.push(artist.id);
    // } catch (error) {
    //   throw new UnprocessableEntityException();
    // }
    return true;
  }

  removeArtistFav(id: string) {
    // const artist = favs.artists.find((artist) => artist === id);
    // if (!artist) {
    //   throw new NotFoundException();
    // }
    // const index = favs.artists.indexOf(artist);
    // favs.artists.splice(index, 1);

    return true;
  }
}
