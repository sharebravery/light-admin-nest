import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ObjectId, Types } from 'mongoose';
import { IsOptional, IsString } from 'class-validator';
import { ValidObjectIdPipe } from 'src/common/pipes/valid-object-id.pipe';
import { AuthGuard } from '@nestjs/passport';
export class VUserParams {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  phoneNumber?: number;
}

// @UseGuards(AuthGuard('jwt'))
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
    name: 'username',
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
  async find(@Query() params?: VUserParams) {
    return this.usersService.find(params);
  }

  @ApiParam({ name: 'id' })
  @ApiOperation({ summary: '根据id查找用户' })
  @Get('/findOne/:id')
  async findOne(@Param('id', new ValidObjectIdPipe()) id: ObjectId) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: '更新用户信息' })
  @Patch(':id')
  async update(
    @Param('id', new ValidObjectIdPipe()) id: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  async remove(@Param('id', new ValidObjectIdPipe()) id: ObjectId) {
    return this.usersService.remove(id);
  }
}
