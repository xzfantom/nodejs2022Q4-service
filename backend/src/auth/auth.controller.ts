import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from 'src/is-public.decorator';
import { SignInDto, SignInSchema } from './dto/signIn.dto';
import { JoiValidationPipe } from 'src/pipes/JoiValidationPipe';
import { SignUpDto, SignUpSchema } from './dto/signUp.dto';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @IsPublic()
  @UsePipes(new JoiValidationPipe(SignInSchema))
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.login, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  @IsPublic()
  @UsePipes(new JoiValidationPipe(SignUpSchema))
  @UseInterceptors(ClassSerializerInterceptor)
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto.login, signUpDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @IsPublic()
  @UsePipes(new JoiValidationPipe(SignUpSchema, new UnauthorizedException()))
  @UseInterceptors(ClassSerializerInterceptor)
  refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto.refreshToken);
  }
}
