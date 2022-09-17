import { Prop, Schema } from '@nestjs/mongoose';
import { IsNumber } from 'class-validator';

@Schema()
export class IPagedEnumerable<T> {
  @IsNumber()
  @Prop()
  offset: number;
  @IsNumber()
  @Prop()
  limit: number;
  @Prop()
  totals: number | null | undefined;
  @Prop()
  items: T[] | null | undefined;
}
