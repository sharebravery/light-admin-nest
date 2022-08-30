import { AccountModule } from './modules/account/account.module';
/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-08-29 19:38:18
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AccountModule,
    MongooseModule.forRoot('mongodb://localhost:27017/soft'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
