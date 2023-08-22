import { ApiProperty } from '@nestjs/swagger';
import * as joi from 'joi'; // strange glitch with default import - joi is undefined

export class SignInDto {
  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;
}

export const SignInSchema = joi.object({
  login: joi.string().required(),
  password: joi.string().required(),
});
