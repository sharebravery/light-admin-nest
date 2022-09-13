import { Schema } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

@Schema()
export class BaseModel {
  id: ObjectId;
}
