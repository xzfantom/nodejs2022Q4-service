import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4, validate } from 'uuid';
import { warn } from 'console';

const users: User[] = [];

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password) {
      throw new BadRequestException();
    }
    const user = {
      id: v4(),
      ...createUserDto,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };
    users.push(user);
    const { password, ...result } = user;
    warn(result);
    return result;
  }

  findAll() {
    return users.map(({ password, ...result }) => result);
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (
      !validate(id) ||
      !updateUserDto.oldPassword ||
      !updateUserDto.newPassword
    ) {
      throw new BadRequestException();
    }
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    if (user.password === updateUserDto.oldPassword) {
      user.password = updateUserDto.newPassword;
      user.updatedAt = Date.now();
      user.version++;
    } else {
      throw new ForbiddenException();
    }
    const { password, ...result } = user;
    return result;
  }

  remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException();
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
  }
}
