/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-03 13:13:52
 */
import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginModel, LoginSchema } from './entities/login.entitie';
import { User, UserSchema } from '../users/entities/user.entity';

const collection = MongooseModule.forFeature([
  { name: LoginModel.name, schema: LoginSchema },
  { name: User.name, schema: UserSchema },
]);

@Module({
  imports: [collection],
  controllers: [AccountController],
})
export class AccountModule {}
