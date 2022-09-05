/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-04 17:00:23
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { Document, ObjectId } from 'mongoose';
import setVirtualKey from 'common/utils/setVirtualKey';

@Schema({ timestamps: true })
export class User extends CreateUserDto {
  id: ObjectId;
}

export const UserSchema = setVirtualKey(SchemaFactory.createForClass(User));
