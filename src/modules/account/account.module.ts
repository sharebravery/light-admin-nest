/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-03 13:13:52
 */
import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginModel, LoginSchema } from './entities/loginModel';

const AccountTable = MongooseModule.forFeature([
  { name: LoginModel.name, schema: LoginSchema },
]);

@Module({
  imports: [AccountTable],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
