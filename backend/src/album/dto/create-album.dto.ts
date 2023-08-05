import * as Joi from 'joi';

export class CreateAlbumDto {
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export const CreateAlbumSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
  artistId: Joi.string().allow(null),
});
