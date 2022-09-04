/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-08-29 19:38:18
 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // 设置全局路由前缀

  const config = new DocumentBuilder()
    .setTitle('软考API')
    .setDescription('The SoftwareTest API json at')
    .setExternalDoc('', ' http://localhost:3000/api-json')
    .setVersion('1.0')
    .addTag('SoftwareTest')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log('====================================');
  console.log('start at:' + 'http://localhost:3000/api');
  console.log('====================================');

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
