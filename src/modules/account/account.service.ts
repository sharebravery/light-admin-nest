/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-03 13:13:52
 */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginModel } from './entities/loginModel';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(LoginModel.name)
    private loginModel: Model<LoginModel>,
  ) {}

  // async create(createAccountDto: CreateAccountDto) {
  //   const createUser = new this.loginModel(createAccountDto);
  //   return await createUser.save();
  // }

  // async findAll() {
  //   return this.loginModel.find().exec();
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} account`;
  // }

  // update(id: number, updateAccountDto: UpdateAccountDto) {
  //   return `This action updates a #${id} account`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} account`;
  // }
}
