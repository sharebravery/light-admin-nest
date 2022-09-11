import * as crypto from 'crypto';

/**
 *制作盐
 *
 * @export
 * @return {*}  {string}
 */
export function makeSalt(): string {
  return crypto.randomBytes(16).toString('base64');
}

/**
 *密码加盐
 *
 * @export
 * @param {string} password
 * @param {string} salt
 * @return {*}  {string}
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  return (
    // 10000 代表迭代次数 16代表长度
    crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
  );
}
