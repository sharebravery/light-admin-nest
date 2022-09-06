/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-07 00:07:23
 */
/**
 *判断object对象是否为无属性值
 *
 * @export
 * @param {object} object
 * @return {*}
 */
export default function isEmptyObject(object: object) {
  return Reflect.ownKeys(object).length === 0;
}
