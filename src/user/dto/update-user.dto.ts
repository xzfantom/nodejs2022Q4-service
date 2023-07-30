import * as joi from 'joi';

export class UpdateUserDto {
  oldPassword: string;
  newPassword: string;
}

export const UpdateUserSchema = joi.object({
  oldPassword: joi.string().required(),
  newPassword: joi.string().required(),
});
