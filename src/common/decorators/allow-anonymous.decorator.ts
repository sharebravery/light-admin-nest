import { SetMetadata } from '@nestjs/common';

export const ALLOW_ANONYMOUS = 'AllowAnonymous';
/**
 * 允许 接口 不校验 token
 */
export const AllowAnonymous = () => SetMetadata(ALLOW_ANONYMOUS, true);
