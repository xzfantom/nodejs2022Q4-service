import { PartialType } from '@nestjs/swagger';
import { CreateAlbumDto } from './create-album.dto';
import * as Joi from 'joi';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}

export const UpdateAlbumSchema = Joi.object({
  name: Joi.string(),
  year: Joi.number(),
  artistId: Joi.string().allow(null),
});
