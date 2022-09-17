import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ValidObjectIdPipe } from 'src/common/pipes/valid-object-id.pipe';
import { User } from './schemas/user.schema';

export class VUserParams {
  @ApiProperty({ description: '账号', type: String })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ description: '用户名', type: String })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: '账号', type: Number })
  @IsOptional()
  phoneNumber?: number;
}

@ApiTags('UsersController')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    type: String,
  })
  @ApiOperation({ summary: '创建用户' })
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<string> {
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
  // @ApiPaginatedResponse(User)
  @ApiOperation({ summary: '条件查询' })
  @Get('find')
  async find(@Query() params?: VUserParams): Promise<User[]> {
    return this.usersService.find(params);
  }

  @ApiOkResponse({
    type: User,
  })
  @ApiQuery({ name: 'id' })
  @ApiOperation({ summary: '根据id查找用户' })
  @Get('findOne')
  async findOne(
    @Query('id', new ValidObjectIdPipe()) id: string,
  ): Promise<User> {
    return this.usersService.findOne(id);
  }

  @ApiOkResponse({
    type: String,
  })
  @ApiOperation({ summary: '更新用户信息' })
  @ApiQuery({ name: 'id' })
  @Post('update')
  async update(
    @Query('id', new ValidObjectIdPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: '删除用户' })
  @ApiQuery({ name: 'id' })
  @Post('delete')
  async remove(@Query('id', new ValidObjectIdPipe()) id: string) {
    return this.usersService.remove(id);
  }
}
