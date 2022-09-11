import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  MinLength,
  MaxLength,
  IsEnum,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsBoolean,
  IsString,
} from 'class-validator';

enum Gender {
  男,
  女,
}

@Schema()
export class CreateUserDto {
  @ApiProperty({
    description: '用户名/账户',
    example: 'sharebravery',
  })
  @IsString()
  @IsNotEmpty({ message: 'username 不允许为空' })
  @Prop({ required: true })
  username: string;

  @ApiProperty({ description: '显示的名字', example: '小明' })
  // @IsNotEmpty({ message: 'nickname 不允许为空' })
  @Prop()
  nickname: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @MinLength(6, {
    message: '密码长度不能小于6位',
  })
  @MaxLength(20, {
    message: '密码长度不能超过20位',
  })
  @IsString()
  @IsNotEmpty({ message: 'password 不允许为空' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    description: '二次输入密码',
    example: '123456',
  })
  @MinLength(6, {
    message: '密码长度不能小于6位',
  })
  @MaxLength(20, {
    message: '密码长度不能超过20位',
  })
  @IsString()
  @IsNotEmpty({ message: '请再次输入密码' })
  confirmPassword: string;

  @ApiProperty({
    description: '电话',
    example: '13123456789',
  })
  @IsOptional()
  @Prop({ required: false })
  phoneNumber: string;

  @IsOptional()
  phoneNumberConfirmed: boolean;

  @ApiProperty({
    description: '邮箱',
    required: false,
    example: 'xx@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  @Prop()
  email: string;

  @IsOptional()
  @Prop()
  emailConfirmed: boolean;

  @ApiProperty({
    description: '性别',
    example: Gender.男,
    enumName: 'Gender',
    enum: [Gender.女, Gender.男],
    type: Number,
    required: false,
  })
  @IsEnum(Gender, {
    message: 'gender只能传入Gender.男(0) 或  Gender.女(1)',
  })
  @IsOptional()
  @Prop({
    type: Number,
    required: false,
    enum: [Gender.男, Gender.女],
  })
  gender: Gender;

  @ApiProperty({ description: '年龄', example: 18, required: false })
  @IsInt()
  @IsOptional()
  @Prop()
  age: number;

  @ApiProperty({ description: '角色', example: ['admin'], required: false })
  @IsOptional()
  roles: Array<any>;

  @ApiProperty({
    description: '锁定',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  @Prop()
  lockoutEnabled: boolean;

  @ApiProperty({
    description: '锁定结束时间',
    example: new Date(),
  })
  @IsDate()
  @IsOptional()
  @Prop()
  lockoutEnd: Date;
}
