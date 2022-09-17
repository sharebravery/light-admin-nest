import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { BaseModel } from 'src/mongoose/baseModel';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { makeSalt, encryptPassword } from 'src/common/utils';

@Schema({ timestamps: true })
export class User extends CreateUserDto implements BaseModel {
  @ApiProperty({
    description: 'ID',
  })
  id: string;

  /**
   *加密盐
   *
   * @type {string}
   * @memberof User
   */
  @IsString()
  @Prop({ required: true, default: 'salt' })
  salt: string;

  /**
   *软删除
   *
   * @type {boolean}
   * @memberof User
   */
  @IsBoolean()
  @IsOptional()
  @Prop()
  deleted: boolean;

  @ApiProperty({
    description: '客户端IP',
    example: '',
  })
  @IsString()
  @Prop()
  IP: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

/**
 * 密码加密中间件
 */
UserSchema.pre('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  const salt = makeSalt();

  const passwordHash = encryptPassword(user.password, salt);
  user.password = passwordHash;
  user.set('salt', salt);

  next();
});
