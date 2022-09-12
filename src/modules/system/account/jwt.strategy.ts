import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SECRET_KEY } from 'src/config/auth';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { ObjectId } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SECRET_KEY,
    });
  }

  async validate(payload: { id: ObjectId; username: string }) {
    const { id, username } = payload;

    const existUser = await this.usersService.findOne(id);

    if (!existUser) {
      throw new UnauthorizedException('token不正确');
    }
    return existUser;
  }
}
