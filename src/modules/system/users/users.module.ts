/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-04 17:00:23
 */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { setVirtualKey } from 'src/common/utils';

const UserCollection = MongooseModule.forFeature([
  { name: User.name, schema: setVirtualKey(UserSchema) },
]);

@Module({
  imports: [UserCollection],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
