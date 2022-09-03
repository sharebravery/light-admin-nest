/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-09-03 13:13:52
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@ApiTags('AccountController')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: '创建账号' })
  @ApiOkResponse({ description: '创建账号', type: CreateAccountDto })
  @ApiResponse({ status: 401, description: '权限不足' })
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}
