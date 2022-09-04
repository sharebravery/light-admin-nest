/*
 * @Description: 统一错误返回处理
 * @Author: sharebravery
 * @Date: 2022-09-04 13:34:09
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    console.log(exception);
    const exceptionRes: any = exception.getResponse();
    const { error, message } = exceptionRes;

    response.header('Content-Type', 'application/json; charset=utf-8');
    response.status(status).json({
      status,
      time: new Date().toISOString(),
      path: request.url,
      error,
      message: message
        ? message
        : `${status >= 500 ? 'Service Error' : 'Client Error'}`,
    });
  }
}
