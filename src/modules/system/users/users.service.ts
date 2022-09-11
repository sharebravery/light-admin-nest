import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { VUserParams } from './users.controller';
import { buildQuery } from 'src/mongoose/queryBuilder';

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
    const model = this.userModel.find();
    const query = buildQuery(params);
    if (query === null) return model;
    return model.and(query);
  }

  async findOne(id: ObjectId) {
    return this.userModel.findById({ _id: id }, { password: 0 });
  }

  async update(id: ObjectId, dto: UpdateUserDto) {
    const userInfo = await this.userModel.findOne({ _id: id });
    if (!userInfo) {
      throw new NotFoundException('用户不存在');
    }
    await this.userModel.updateOne({ _id: id }, { $set: dto });
  }

  async remove(id: ObjectId) {
    return this.userModel.remove({ _id: id });
  }
}
