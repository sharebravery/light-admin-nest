/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-04 17:00:23
 */
import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  MinLength,
  MaxLength,
  IsMobilePhone,
  IsEnum,
  IsDate,
  IsNotEmpty,
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
  @ApiProperty({ description: '显示的名字', example: '小明' })
  @IsNotEmpty({ message: 'name 不允许为空' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: '实际用户名', example: 'xiaoming' })
  @IsNotEmpty({ message: 'username 不允许为空' })
  @Prop({ required: true })
  username: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @MinLength(6, {
    message: '密码长度不能小于6位',
  })
  @MaxLength(20, {
    message: '密码长度不能超过20位',
  })
  @IsNotEmpty({ message: 'password 不允许为空' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    description: '电话',
    example: 18771234567,
  })
  @IsMobilePhone('zh-CN')
  mobilePhone: number;

  @ApiProperty({ description: '邮箱', required: false })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '性别',
    example: 1,
    enumName: 'Gender',
    enum: Gender,
    type: Number,
    required: false,
  })
  @IsEnum([Gender.男, Gender.女], {
    message: 'gender只能传入Gender.男(1) 或  Gender.女(2)',
  })
  @Prop({
    type: Number,
    required: false,
    enum: [Gender.男, Gender.女],
  })
  gender: Gender;

  @ApiProperty({ description: '年龄', example: 18, required: false })
  age: number;

  @ApiProperty({ description: '角色', example: ['admin'], required: false })
  roles: Array<any>;
}
