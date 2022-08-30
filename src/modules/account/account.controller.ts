/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-08-29 21:19:20
 */
import { Controller, Post, Request } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('AccountController')
@Controller('Account')
export class AccountController {
  @ApiOperation({
    summary: '登录',
  })
  @Post('Login')
  async Login(@Request() req) {
    return req;
  }
}
