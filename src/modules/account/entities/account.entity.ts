/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-03 13:13:52
 */
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuditMetadata } from '../../../entities/auditMetadata.entity';
import { Document } from 'mongoose';

@Schema()
export class Account extends Document implements AuditMetadata {
  createDate: Date;

  updateDate: Date;

  id: string;

  username: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
