import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { setVirtualKey } from 'src/common/utils';
import { JwtStrategy } from '../account/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

const UserCollection = MongooseModule.forFeature([
  { name: User.name, schema: setVirtualKey(UserSchema) },
]);

@Module({
  imports: [UserCollection, PassportModule],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
})
export class UsersModule {}
