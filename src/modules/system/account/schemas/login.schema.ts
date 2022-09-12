import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginModel {
  @ApiProperty({
    name: 'account',
    type: String,
    description: '账号/用户名',
    example: 'admin',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'account 不允许为空' })
  account: string;

  @ApiProperty({
    name: 'password',
    type: String,
    description: '密码',
    example: '123456',
    required: true,
  })
  @IsNotEmpty({ message: 'password 不允许为空' })
  @IsString()
  password: string;
}
