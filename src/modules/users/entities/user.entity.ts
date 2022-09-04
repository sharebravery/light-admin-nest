/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-04 17:00:23
 */
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { BaseModel } from '../../../models/baseModel';

@Schema({ timestamps: true })
export class User extends BaseModel {}

export const UserSchema = SchemaFactory.createForClass(User);
