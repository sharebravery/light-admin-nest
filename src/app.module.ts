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
import { UserModule } from './modules/user/user.module';
import mongoose from 'mongoose';

@Module({
  imports: [
    AccountModule,
    UserModule,
    MongooseModule.forRoot(
      'mongodb://admin:123456@localhost:27017/soft?authSource=admin',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected');
});
