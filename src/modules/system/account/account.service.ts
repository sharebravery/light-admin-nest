import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { validPhone, validEmail, encryptPassword } from 'src/common/utils';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(account: string, password: string): Promise<User> {
    let user: User = null;

    if (validPhone(account)) {
      // 手机登录
      user = await this.userModel.findOne({ phoneNum: account });
    } else if (validEmail(account)) {
      // 邮箱
      user = await this.userModel.findOne({ email: account });
    } else {
      // 帐号
      user = await this.userModel.findOne({ username: account });
    }

    if (!user) {
      throw new NotFoundException('用户不存在');
    } else {
      if (user.password !== encryptPassword(password, user.salt)) {
        throw new NotFoundException('密码错误');
      }

      if (!user.lockoutEnabled) throw new UnauthorizedException('账户已被锁定');
    }
    return user;
  }

  // 生成 token
  async certificate(user: User) {
    const { id, username, phoneNumber, email } = user;

    const payload = { id, username };

    const token = this.jwtService.sign(payload);
    return token;
  }
}
