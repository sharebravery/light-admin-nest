/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-04 17:00:23
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { Document, ObjectId } from 'mongoose';
import setVirtualKey from 'common/utils/setVirtualKey';
import { BaseModel } from 'base/baseModel';

@Schema({ timestamps: true })
export class User extends CreateUserDto implements BaseModel {
  id: ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
