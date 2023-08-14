import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ParseUUIDPipe,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto, CreateAlbumSchema } from './dto/create-album.dto';
import { UpdateAlbumDto, UpdateAlbumSchema } from './dto/update-album.dto';
import { JoiValidationPipe } from '../pipes/JoiValidationPipe';
import { Album } from './entities/album.entity';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateAlbumSchema))
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return new Album(await this.albumService.create(createAlbumDto));
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    return (await this.albumService.findAll()).map((album) => new Album(album));
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return new Album(await this.albumService.findOne(id));
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(UpdateAlbumSchema))
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return new Album(await this.albumService.update(id, updateAlbumDto));
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.remove(id);
  }
}
