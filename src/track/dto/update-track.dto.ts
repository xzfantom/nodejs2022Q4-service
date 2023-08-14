import { PartialType } from '@nestjs/swagger';
import { CreateTrackDto } from './create-track.dto';
import * as Joi from 'joi';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {}

export const UpdateTrackSchema = Joi.object({
  name: Joi.string(),
  artistId: Joi.string().allow(null),
  albumId: Joi.string().allow(null),
  duration: Joi.number().integer(),
});
