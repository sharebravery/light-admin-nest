/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-03 13:13:52
 */
import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class CreateAccountDto {
  @ApiProperty({
    name: 'username',
    type: String,
    description: '账号',
    example: 'admin',
    required: true,
  })
  @Prop({ required: true })
  username: string;

  @ApiProperty({
    name: 'password',
    type: String,
    description: '密码',
    example: '123456',
    required: true,
  })
  @Prop({ required: true })
  password: string;
}
