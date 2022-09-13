import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role';

export const ROLES_KEY = 'roles';

/** 角色装饰器 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
