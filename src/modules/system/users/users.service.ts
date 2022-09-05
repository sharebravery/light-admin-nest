/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-04 17:00:23
 */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

export interface IUserParams {
  username?: string;
  name?: string;
  phoneNumber?: number;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const model = new this.userModel(createUserDto);
      return await model.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async find(params: IUserParams) {
    const { name, username, phoneNumber } = params;
    return this.userModel.find({ name: /name/ });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: ObjectId) {
    return this.userModel.find({ _id: id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
