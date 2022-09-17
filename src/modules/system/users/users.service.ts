import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryBuilder } from 'src/mongoose/queryBuilder';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { VUserParams } from './users.controller';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(dto: CreateUserDto) {
    try {
      const { password, confirmPassword, email, username } = dto;
      if (password !== confirmPassword) {
        throw new NotFoundException('两次输入的密码不一致，请检查');
      }

      const existUsername = await this.userModel.findOne({ username });

      const existEmail = await this.userModel.findOne({ email });

      if (existUsername) {
        throw new HttpException('用户名已存在', HttpStatus.FORBIDDEN);
      }
      if (existEmail) {
        throw new HttpException('邮箱已注册', HttpStatus.FORBIDDEN);
      }

      const res = await new this.userModel(dto).save();
      return res.id;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async find(params: VUserParams) {
    const query = new QueryBuilder(params);

    return this.userModel.find(query.$and(), { password: 0, salt: 0 });
  }

  async findOne(id: string) {
    return this.userModel.findById({ _id: id }, { password: 0, salt: 0 });
  }

  async update(id: string, dto: UpdateUserDto) {
    const userInfo = await this.userModel.findOne({ _id: id });
    if (!userInfo) {
      throw new NotFoundException('用户不存在');
    }
    await this.userModel.updateOne({ _id: id }, { $set: dto });
  }

  async remove(id: string) {
    return this.userModel.remove({ _id: id });
  }
}
