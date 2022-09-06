/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-04 17:00:23
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class IUserParams {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: number;
}

@ApiTags('UsersController')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '创建用户' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiQuery({
    name: 'name',
    description: '姓名',
    required: false,
  })
  @ApiQuery({
    name: ' username',
    description: '用户名',
    required: false,
  })
  @ApiQuery({
    name: 'phoneNumber',
    description: '电话',
    required: false,
  })
  @ApiOperation({ summary: '条件查询' })
  @Get()
  async Find(@Query() params?: IUserParams) {
    return this.usersService.find(params);
  }

  // @ApiOperation({ summary: '查找用户' })
  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: '根据id查找用户' })
  @Get('/findOne/:id')
  findOne(@Param('id') id: ObjectId) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: '更新用户信息' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
