/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-06 23:34:53
 */
import { Schema } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isEmptyObject, omitNullAndUndefined } from 'src/common/utils';

export default class QueryBuilder<T extends typeof Model> {
  constructor(private model: T & typeof Model) {}
}

/**
 *构建查询条件
 *
 * @export
 * @template T
 * @param {T} params
 * @return {*}
 */
export function buildQuery<T>(params: T & object) {
  if (!params || isEmptyObject(params)) return null;
  const query = [];
  const exist = omitNullAndUndefined(params);

  for (const key in exist) {
    query.push({ [key]: exist[key] });
  }

  return query;
}
