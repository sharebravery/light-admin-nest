import { Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { buildQuery } from 'src/common/utils';

export class QueryBuilder<T extends object> {
  constructor(private params: T & object) {
    this.query = buildQuery(params);
  }

  query = null;

  $and() {
    if (this.query === null) return {};
    return { $and: this.query };
  }

  $or() {
    if (this.query === null) return {};
    return { $or: this.query };
  }
}
