export function validPhone(phone: string): boolean {
  const regx = /^1(3|4|5|6|7|8|9)\d{9}$/;
  return regx.test(phone);
}

export function validEmail(email: string): boolean {
  const regx = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return regx.test(email);
}
