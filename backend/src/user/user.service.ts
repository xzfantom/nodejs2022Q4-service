import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from '../db/db.service';
import { MyLoggerService } from '../logger/mylogger.service';

@Injectable()
export class UserService {
  constructor(private dbService: DbService, private logger: MyLoggerService) {}
  async create(createUserDto: CreateUserDto) {
    return await this.dbService.createUser(createUserDto);
  }

  async findAll() {
    this.logger.log('findAll', 'UserService');
    return await this.dbService.findAllUsers();
  }

  async findOne(id: string) {
    return await this.dbService.findOneUser(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.dbService.findOneUser(id);
    if (!user) {
      throw new NotFoundException();
    }
    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException();
    }
    return this.dbService.updateUser(id, {
      ...user,
      version: user.version + 1,
      updatedAt: new Date(),
      password: updateUserDto.newPassword,
    });
  }

  async remove(id: string) {
    await this.dbService.removeUser(id);
  }
}
