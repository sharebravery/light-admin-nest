/*
 * @Description: 统一返回值拦截器
 * @Author: sharebravery
 * @Date: 2022-09-04 13:49:42
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface IResponse<T> {
  code: number;
  time: Date;
  success: boolean;
  data: T;
  message: string;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        code: 200,
        data,
        time: new Date().toISOString(),
        message: '请求成功！',
      })),
    );
  }
}
