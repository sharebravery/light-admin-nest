import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { EXPIRES_IN, SECRET_KEY } from 'src/config/auth';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AccountService } from './account.service';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { User, UserSchema } from '../users/schemas/user.schema';

const collection = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
]);

@Module({
  imports: [
    collection,
    JwtModule.register({
      secret: SECRET_KEY, // 秘钥
      signOptions: { expiresIn: `${EXPIRES_IN}s` }, // token 过期时效
    }),
    PassportModule,
  ],
  controllers: [AccountController],
  providers: [AccountService, LocalStrategy, JwtStrategy, UsersService],
  exports: [JwtModule],
})
export class AccountModule {}
