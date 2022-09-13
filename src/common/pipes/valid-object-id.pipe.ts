import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class ValidObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!mongoose.isValidObjectId(value)) {
      throw new BadRequestException('Validation failed: Not an ObjectId');
    }
    return value;
  }
}
