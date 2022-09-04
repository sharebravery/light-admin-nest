/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-03 13:13:52
 */
import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Account, AccountSchema } from './entities/account.entity';
import { MongooseModule } from '@nestjs/mongoose';

const AccountTable = MongooseModule.forFeature([
  { name: Account.name, schema: AccountSchema },
]);

@Module({
  imports: [AccountTable],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
