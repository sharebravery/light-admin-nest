import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from './account.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly accountService: AccountService) {
    super({
      usernameField: 'account',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(account: string, password: string) {
    const user = await this.accountService.validateUser(account, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
