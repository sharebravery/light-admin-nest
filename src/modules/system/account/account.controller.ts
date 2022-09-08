/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-03 13:13:52
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { encryptPassword, validEmail, validPhone } from 'src/common/utils';
import { User } from '../users/entities/user.entity';
import { LoginModel } from './entities/login.entitie';

@ApiTags('AccountController')
@Controller('account')
export class AccountController {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  @ApiOperation({ summary: '登录' })
  @Post('SignedIn')
  async SignedIn(dto: LoginModel) {
    const { account, password } = dto;

    let user: User = null;

    if (validPhone(account)) {
      // 手机登录
      user = await this.userModel.findOne({ phoneNum: account });
    } else if (validEmail(account)) {
      // 邮箱
      user = await this.userModel.findOne({ email: account });
    } else {
      // 帐号
      user = await this.userModel.findOne({ account });
    }

    if (!user) {
      throw new NotFoundException('用户不存在');
    } else {
      if (user.password !== encryptPassword(password, user.salt)) {
        throw new NotFoundException('密码错误');
      }

      if (!user.lockoutEnabled) throw new UnauthorizedException('账户已被锁定');
    }
  }

  @ApiOperation({ summary: '获取登录账户信息' })
  @Get('Me')
  Me() {
    return true;
  }
}
