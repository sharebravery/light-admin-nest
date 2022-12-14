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
    console.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception?.getStatus === undefined ? 500 : exception?.getStatus();
    const exceptionRes: any =
      exception?.getResponse === undefined ? 500 : exception.getResponse();
    const { error, message } = exceptionRes;

    response.header('Content-Type', 'application/json; charset=utf-8');
    response.status(status).json({
      code: status,
      success: status >= 400 ? false : true,
      time: new Date().toISOString(),
      path: request.url,
      error: error ?? exception.message,
      message: message
        ? message
        : `${
            status >= 500
              ? '服务器错误（Service Error）'
              : '客户端错误（Client Error）'
          }`,
    });
  }
}
