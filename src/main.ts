/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-08-29 19:38:18
 */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('软考API')
    .setDescription('The SoftwareTest API description')
    .setVersion('1.0')
    .addTag('Software')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log('====================================');
  console.log('start at:' + 'http://localhost:3000/api');
  console.log('====================================');

  await app.listen(3000);
}
bootstrap();
