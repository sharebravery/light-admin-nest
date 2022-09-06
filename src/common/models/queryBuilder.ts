/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-06 23:34:53
 */
import { Schema } from '@nestjs/mongoose';
import isEmptyObject from 'common/utils/isEmptyObject';
import omitNullAndUndefined from 'common/utils/omitNullAndUndefined';

export default class QueryBuilder {
  constructor(private model: typeof Schema) {}
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
    query.push({ [key.trim()]: exist[key] });
  }

  return query;
}
