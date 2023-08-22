import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.userService.findOneByLogin(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.id, login: user.login };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
        expiresIn: this.configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME'),
      }),
    };
  }

  async signUp(login: string, password: string) {
    const user = await this.userService.create({ login, password });
    return new User(user);
  }

  async refresh(refreshToken: string) {
    const payload = await this.jwtService
      .verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
      })
      .catch(() => {
        throw new UnauthorizedException();
      });

    const user = await this.userService.findOne(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: await this.jwtService.signAsync({
        userId: user.id,
        login: user.login,
      }),
    };
  }
}
