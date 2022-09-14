import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { validPhone, validEmail, encryptPassword } from 'src/common/utils';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/user.schema';

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

  /**
   *生成 token
   *
   * @param {User} user
   * @return {*}
   * @memberof AccountService
   */
  async getToken(user: User) {
    const { id, username, phoneNumber, email } = user;

    const payload = { id, username };

    const token = this.jwtService.sign(payload);
    return token;
  }

  /**
   *生成刷新 token
   *
   * @param {string} id
   * @return {*}  {string}
   * @memberof AccountService
   */
  refreshToken(id: string): string {
    return this.jwtService.sign({ id });
  }

  /**
   *校验 token
   *
   * @param {string} token
   * @return {*}  {string}
   * @memberof AccountService
   */
  verifyToken(token: string): string {
    try {
      if (!token) return null;
      const id = this.jwtService.verify(token.replace('Bearer ', ''));
      return id;
    } catch (error) {
      return null;
    }
  }
}
