import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from '../db/db.service';
import { MyLoggerService } from '../logger/mylogger.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  private cryptSalt: number;

  constructor(
    private dbService: DbService,
    private logger: MyLoggerService,
    private configService: ConfigService,
  ) {
    const cryptSalt = Number(this.configService.get<number>('CRYPT_SALT'));
    this.cryptSalt = cryptSalt;
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      this.cryptSalt,
    );

    const user = {
      ...createUserDto,
      password: hashedPassword,
    };

    return await this.dbService.createUser(user);
  }

  async findAll() {
    this.logger.log('findAll', 'UserService');
    return await this.dbService.findAllUsers();
  }

  async findOne(id: string) {
    return await this.dbService.findOneUser(id);
  }

  async findOneByLogin(login: string, password: string) {
    const user = await this.dbService.findOneUserByLogin(login);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    throw new ForbiddenException();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.dbService.findOneUser(id);
    if (!user) {
      throw new NotFoundException();
    }

    const match = await bcrypt.compare(
      updateUserDto.oldPassword,
      user.password,
    );
    if (!match) {
      throw new ForbiddenException();
    }

    const password = await bcrypt.hash(
      updateUserDto.newPassword,
      this.cryptSalt,
    );

    return this.dbService.updateUser(id, {
      ...user,
      version: user.version + 1,
      updatedAt: new Date(),
      password,
    });
  }

  async remove(id: string) {
    await this.dbService.removeUser(id);
  }
}
