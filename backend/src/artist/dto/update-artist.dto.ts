import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class UpdateArtistDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  grammy?: boolean;
}

export const UpdateArtistSchema = Joi.object({
  name: Joi.string(),
  grammy: Joi.boolean(),
});
