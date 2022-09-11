/**
 *判断object对象是否为无属性值
 *
 * @export
 * @param {object} object
 * @return {*}
 */
export function isEmptyObject(object: object) {
  return Reflect.ownKeys(object).length === 0;
}
