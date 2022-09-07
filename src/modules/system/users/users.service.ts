import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isEmptyObject } from 'src/common/utils/isEmptyObject';
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
      const exist = await this.userModel.findOne({ email: dto.email });

      if (!isEmptyObject(exist)) {
        throw new HttpException('邮箱已注册', HttpStatus.FORBIDDEN);
      }

      const model = new this.userModel(dto);
      return await model.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async find(params: VUserParams) {
    const model = this.userModel.find();
    const query = buildQuery(params);
    if (query === null) return [];
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
