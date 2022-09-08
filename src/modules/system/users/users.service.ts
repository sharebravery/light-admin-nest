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
import { makeSalt, encryptPassword } from 'src/common/utils/cryptogram';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(dto: CreateUserDto) {
    try {
      if (dto.password !== dto.confirmPassword) {
        throw new NotFoundException('两次输入的密码不一致，请检查');
      }

      const exist = await this.userModel.findOne({ email: dto.email });

      if (exist) {
        throw new HttpException('邮箱已注册', HttpStatus.FORBIDDEN);
      }

      const salt = makeSalt();
      const passwordHash = encryptPassword(dto.password, salt);

      const model = new this.userModel(dto);
      model.password = passwordHash;
      model.salt = salt;

      const user = await model.save();

      return user.id;
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
