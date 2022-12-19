import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Register } from '../../register/schemas/register.schema';

export type UserDocument = mongoose.HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  salt: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  _token: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: 'user' })
  role: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Register' }],
  })
  registers: Register[];
}

export const UserSchema = SchemaFactory.createForClass(User);
