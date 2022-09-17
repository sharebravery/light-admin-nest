import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局路由前缀
  app.setGlobalPrefix('api');

  // 全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局统一返回值的拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 全局数据监测校验管道
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('mongodb')
    .setDescription('The mongodb API json at')
    .setExternalDoc('', ' http://localhost:9527/api-json')
    .setVersion('1.0')
    .addTag('mongoose')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log('====================================');
  console.log('start at:' + 'http://localhost:9527/api');
  console.log('====================================');

  await app.listen(9527);
}
bootstrap();
