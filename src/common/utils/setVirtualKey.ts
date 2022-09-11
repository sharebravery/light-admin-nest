import mongoose from 'mongoose';

/**
 *将_id映射为虚拟Key,并不返回__v
 *
 * @export
 * @template T
 * @param {(T & mongoose.Schema)} schema
 * @param {string} [key='id']
 * @return {*}  {T}
 */
export function setVirtualKey<T>(schema: T & mongoose.Schema, key = 'id'): T {
  schema.set('toJSON', {
    virtuals: true,
    transform(doc, ret) {
      ret[key] = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  });

  return schema;
}
