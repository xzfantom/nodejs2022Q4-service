import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from 'src/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @IsPublic()
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.login, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @IsPublic()
  @UseInterceptors(ClassSerializerInterceptor)
  signUp(@Body() signUpDto: Record<string, any>) {
    return this.authService.signUp(signUpDto.login, signUpDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @IsPublic()
  refresh(@Body() refreshDto: Record<string, any>) {
    return this.authService.refresh(refreshDto.refreshToken);
  }
}
