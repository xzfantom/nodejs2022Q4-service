import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from '../db/db.service';
import { MyLoggerService } from '../logger/mylogger.service';
import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  private cryptSalt;

  constructor(
    private dbService: DbService,
    private logger: MyLoggerService,
    private configService: ConfigService,
  ) {
    this.cryptSalt = this.configService.get('CRYPT_SALT');
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      this.cryptSalt,
    );
    return await this.dbService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findAll() {
    this.logger.log('findAll', 'UserService');
    return await this.dbService.findAllUsers();
  }

  async findOne(id: string) {
    return await this.dbService.findOneUser(id);
  }

  async findOneByLogin(login: string, password: string) {
    return await this.dbService.findOneUserByLogin(login);
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
