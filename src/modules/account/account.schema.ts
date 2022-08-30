/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-08-29 21:46:10
 */
import { Prop, Schema } from '@nestjs/mongoose';
import { AuditMetadata } from 'src/schemas/auditMetadata.schema';

@Schema()
export class AccountSchema extends AuditMetadata {
  @Prop()
  username: string;

  @Prop()
  password: string;
}
