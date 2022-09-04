import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  MinLength,
  MaxLength,
  IsMobilePhone,
  IsEnum,
} from 'class-validator';

/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-03 13:14:06
 */
enum Gender {
  男,
  女,
}

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: '小明' })
  name: string;

  @ApiProperty({ description: '用户', example: 'xiaoming' })
  username: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @MinLength(6, {
    message: '密码长度不能小于6位',
  })
  @MaxLength(20, {
    message: '密码长度不能超过20位',
  })
  password: string;

  @ApiProperty({ description: '邮箱' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '电话',
    example: 18771234567,
  })
  @IsMobilePhone('zh-CN')
  mobilePhone: number;

  @ApiProperty({
    description: '性别',
    example: 1,
    enumName: 'Gender',
    enum: Gender,
    type: Number,
  })
  @IsEnum([Gender.男, Gender.女], {
    message: 'gender只能传入Gender.男(1) 或  Gender.女(2)',
  })
  @Prop({
    type: Number,
    required: true,
    enum: [Gender.男, Gender.女],
  })
  gender: Gender;

  @ApiProperty({ description: '年龄', example: 18, required: false })
  age: number;
}
