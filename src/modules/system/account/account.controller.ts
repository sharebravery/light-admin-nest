import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginModel } from './entities/login.entity';
import { EXPIRES_IN } from 'src/config/auth';
import { AccountService } from './account.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles, RolesGuard } from './role.guard';

@ApiTags('AccountController')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  @Post('SignedIn')
  async SignedIn(@Body() dto: LoginModel, @Req() req, @Res() res) {
    /**校验完毕，发放凭证 */
    const token = await this.accountService.certificate(req.user);

    res.setHeader('x-access-token', token);
    res.setHeader('x-access-token-expires-in', EXPIRES_IN);

    res.send({
      data: {
        succeeded: true,
        isLockedOut: false,
        isNotAllowed: false,
        requiresTwoFactor: false,
      },
      success: true,
      code: 200,
      time: new Date().toISOString(),
      message: '登录成功！',
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '获取登录账户信息' })
  @Roles('admin', 'root')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('Me')
  Me(@Req() req) {
    return req.user;
  }
}
