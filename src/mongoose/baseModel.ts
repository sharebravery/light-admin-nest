/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-04 17:59:43
 */

import { Schema } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

@Schema()
export class BaseModel {
  id: ObjectId;
}
