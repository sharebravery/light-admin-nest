/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-03-15 09:08:20
 */
import { Prop, Schema } from '@nestjs/mongoose';

export class AuditMetadata {
  @Prop({ timestamps: true })
  createDate: Date;

  @Prop({ timestamps: true })
  updateDate: Date;
}
