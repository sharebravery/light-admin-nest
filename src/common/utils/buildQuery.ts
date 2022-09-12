import { isEmptyObject } from './isEmptyObject';
import { omitNullAndUndefined } from './omitNullAndUndefined';

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
