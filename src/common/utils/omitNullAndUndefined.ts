import { isEmptyObject } from './isEmptyObject';

/**
 *忽略null和undefined,会修改源对象
 *
 * @export
 * @template T
 * @param {T} object
 * @return {*}  {T}
 */
export function omitNullAndUndefined<T>(object: T & object): T {
  if (!object || isEmptyObject(object)) return null;

  for (const key in object) {
    if (object[key] === null || object[key] === undefined) {
      delete object[key];
    }
  }

  return object;
}
