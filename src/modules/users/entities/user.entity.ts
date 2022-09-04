/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-04 17:00:23
 */
import { Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

@Schema({ timestamps: true })
export class User {
  @ApiProperty({
    description: '锁定',
    example: true,
  })
  lockoutEnabled: boolean;

  @ApiProperty({
    description: '锁定结束时间',
    example: true,
  })
  @IsDate()
  lockoutEnd: Date;

  @ApiProperty({
    description: '已删除',
    example: true,
  })
  deleted: boolean;
}
