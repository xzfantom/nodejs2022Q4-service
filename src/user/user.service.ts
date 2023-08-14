import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}
  create(createUserDto: CreateUserDto) {
    return this.dbService.createUser(createUserDto);
  }

  findAll() {
    return this.dbService.findAllUsers();
  }

  findOne(id: string) {
    return this.dbService.findOneUser(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.dbService.updateUser(id, updateUserDto);
  }

  remove(id: string) {
    this.dbService.removeUser(id);
  }
}
