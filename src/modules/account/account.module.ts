/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-08-29 19:57:37
 */
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
