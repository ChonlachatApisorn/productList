import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../common/base.schema';

export type UserDocument = UserData & Document;

@Schema({ timestamps: true })
export class UserData extends BaseSchema {
  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserData);
