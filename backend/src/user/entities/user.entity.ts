import { Exclude } from 'class-transformer';

export class User {
  id: string; // uuid v4

  login: string;

  @Exclude()
  password: string;

  version: number; // integer number, increments on update

  createdAt: Date; // timestamp of creation

  updatedAt: Date; // timestamp of last update

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
