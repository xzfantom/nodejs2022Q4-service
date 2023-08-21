import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  UsePipes,
  Put,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto, CreateTrackSchema } from './dto/create-track.dto';
import { UpdateTrackDto, UpdateTrackSchema } from './dto/update-track.dto';
import { JoiValidationPipe } from '../pipes/JoiValidationPipe';
import { Track } from './entities/track.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateTrackSchema))
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    const result = await this.trackService.findAll();
    return result.map((track) => new Track(track));
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.trackService.findOne(id);
    return new Track(result);
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(UpdateTrackSchema))
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return new Track(await this.trackService.update(id, updateTrackDto));
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.trackService.remove(id);
  }
}
