/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-08-29 19:38:18
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
