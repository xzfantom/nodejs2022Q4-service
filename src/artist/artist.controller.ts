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
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto, CreateArtistSchema } from './dto/create-artist.dto';
import { UpdateArtistDto, UpdateArtistSchema } from './dto/update-artist.dto';
import { JoiValidationPipe } from 'src/pipes/JoiValidationPipe';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateArtistSchema))
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(UpdateArtistSchema))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.remove(id);
  }
}
