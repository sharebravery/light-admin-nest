/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-04 16:54:26
 */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
})
export class AuthModule {}
