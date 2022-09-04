/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-03 13:13:52
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name)
    private accountModel: Model<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const createUser = new this.accountModel(createAccountDto);
    return await createUser.save();
  }

  async findAll(): Promise<Account[]> {
    return this.accountModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
