import { Exclude, Transform } from 'class-transformer';

export class User {
  id: string; // uuid v4

  login: string;

  @Exclude()
  password: string;

  version: number; // integer number, increments on update

  @Transform(({ value }) => value.getTime())
  createdAt: Date; // timestamp of creation

  @Transform(({ value }) => value.getTime())
  updatedAt: Date; // timestamp of last update

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
