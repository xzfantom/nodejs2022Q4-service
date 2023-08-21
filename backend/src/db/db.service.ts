import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateAlbumDto } from '../album/dto/create-album.dto';
import { UpdateAlbumDto } from '../album/dto/update-album.dto';
import { Album } from '../album/entities/album.entity';
import { CreateArtistDto } from '../artist/dto/create-artist.dto';
import { UpdateArtistDto } from '../artist/dto/update-artist.dto';
import { Artist } from '../artist/entities/artist.entity';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrackDto } from '../track/dto/create-track.dto';
import { UpdateTrackDto } from '../track/dto/update-track.dto';
import { Track } from '../track/entities/track.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';

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

  async findOneUserByLogin(login: string) {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: { login },
      });
      return user;
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
    const tracks = (
      await this.prisma.track.findMany({ where: { isFav: true } })
    ).map((track) => new Track(track));
    const albums = (
      await this.prisma.album.findMany({ where: { isFav: true } })
    ).map((album) => new Album(album));
    const artists = (
      await this.prisma.artist.findMany({
        where: { isFav: true },
      })
    ).map((artist) => new Artist(artist));

    return { tracks, albums, artists };
  }

  async addTrackFav(id: string) {
    try {
      await this.prisma.track.update({
        where: { id },
        data: { isFav: true },
      });
    } catch (error) {
      throw new UnprocessableEntityException();
    }

    return true;
  }

  async removeTrackFav(id: string) {
    try {
      await this.prisma.track.update({
        where: { id, isFav: true },
        data: { isFav: false },
      });
    } catch (error) {
      throw new NotFoundException();
    }

    return true;
  }

  async addAlbumFav(id: string) {
    try {
      await this.prisma.album.update({
        where: { id },
        data: { isFav: true },
      });
    } catch (error) {
      throw new UnprocessableEntityException();
    }

    return true;
  }

  async removeAlbumFav(id: string) {
    try {
      await this.prisma.album.update({
        where: { id, isFav: true },
        data: { isFav: false },
      });
    } catch (error) {
      throw new NotFoundException();
    }
    return true;
  }

  async addArtistFav(id: string) {
    try {
      await this.prisma.artist.update({
        where: { id },
        data: { isFav: true },
      });
    } catch (error) {
      throw new UnprocessableEntityException();
    }

    return true;
  }

  async removeArtistFav(id: string) {
    try {
      await this.prisma.artist.update({
        where: { id, isFav: true },
        data: { isFav: false },
      });
    } catch (error) {
      throw new NotFoundException();
    }

    return true;
  }
}
