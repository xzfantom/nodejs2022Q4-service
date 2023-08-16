import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  UsePipes,
  ParseUUIDPipe,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserSchema } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserSchema } from './dto/update-user.dto';
import { JoiValidationPipe } from '../pipes/JoiValidationPipe';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    return new User(newUser);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(): Promise<Array<User>> {
    const result = await this.userService.findAll();
    return result.map((user) => new User(user));
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    const result = await this.userService.findOne(id);
    return new User(result);
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(UpdateUserSchema))
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await this.userService.update(id, updateUserDto);
    return new User(result);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }
}
