import { ApiProperty } from '@nestjs/swagger';
import * as joi from 'joi'; // strange glitch with default import - joi is undefined

export class RefreshDto {
  @ApiProperty()
  refreshToken: string;
}

export const RefreshSchema = joi.object({
  refreshToken: joi.string().required(),
});
