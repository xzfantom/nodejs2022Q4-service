import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class CreateArtistDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  grammy: boolean;
}

export const CreateArtistSchema = Joi.object({
  name: Joi.string().required(),
  grammy: Joi.boolean().required(),
});
