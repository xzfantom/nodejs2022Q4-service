import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class CreateTrackDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  artistId: string | null; // refers to Artist

  @ApiProperty()
  albumId: string | null; // refers to Album

  @ApiProperty()
  duration: number; // integer number
}

export const CreateTrackSchema = Joi.object({
  name: Joi.string().required(),
  artistId: Joi.string().allow(null),
  albumId: Joi.string().allow(null),
  duration: Joi.number().integer().required(),
});
