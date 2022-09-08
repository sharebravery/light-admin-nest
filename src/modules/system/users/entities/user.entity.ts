/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-04 17:00:23
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { Document, ObjectId } from 'mongoose';
import { BaseModel } from 'src/mongoose/baseModel';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class User extends CreateUserDto implements BaseModel {
  id: ObjectId;

  /**
   *加密盐
   *
   * @type {string}
   * @memberof User
   */
  @IsString()
  salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
