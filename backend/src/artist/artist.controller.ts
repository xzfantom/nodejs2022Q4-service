import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  UsePipes,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto, CreateArtistSchema } from './dto/create-artist.dto';
import { UpdateArtistDto, UpdateArtistSchema } from './dto/update-artist.dto';
import { JoiValidationPipe } from '../pipes/JoiValidationPipe';
import { Artist } from './entities/artist.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateArtistSchema))
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createArtistDto: CreateArtistDto) {
    return new Artist(await this.artistService.create(createArtistDto));
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    return (await this.artistService.findAll()).map(
      (artist) => new Artist(artist),
    );
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return new Artist(await this.artistService.findOne(id));
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(UpdateArtistSchema))
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return new Artist(await this.artistService.update(id, updateArtistDto));
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.artistService.remove(id);
  }
}
