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
import { EXPIRES_IN } from 'src/config/auth';
import { AccountService } from './account.service';
import { LoginModel } from './schemas/login.schema';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role';
import { AllowAnonymous } from 'src/common/decorators/allow-anonymous.decorator';

@ApiTags('AccountController')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: '登录' })
  @AllowAnonymous()
  @UseGuards(LocalAuthGuard)
  @Post('SignedIn')
  async SignedIn(@Body() dto: LoginModel, @Req() req, @Res() res) {
    /**校验完毕，发放凭证 */
    const token = await this.accountService.getToken(req.user);

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
  @Get('Me')
  Me(@Req() req) {
    return req.user;
  }
}
