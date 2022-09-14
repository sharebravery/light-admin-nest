import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ALLOW_ANONYMOUS } from '../decorators/allow-anonymous.decorator';
import { AccountService } from 'src/modules/system/account/account.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AccountService)
    private readonly accountService: AccountService,
  ) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 是否允许 无 token 访问
    const allowAnonymous = this.reflector.getAllAndOverride<boolean>(
      ALLOW_ANONYMOUS,
      [context.getHandler(), context.getClass()],
    );
    if (allowAnonymous) return true;

    const req = context.switchToHttp().getRequest();
    const accessToken = req.get('Authorization');
    if (!accessToken) throw new ForbiddenException('请先登录');
    const atUserId = this.accountService.verifyToken(accessToken);
    if (!atUserId)
      throw new UnauthorizedException('当前登录已过期，请重新登录');
  }

  async activate(context: ExecutionContext): Promise<boolean> {
    return super.canActivate(context) as Promise<boolean>;
  }
}
