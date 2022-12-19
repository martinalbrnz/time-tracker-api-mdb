import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Project } from '../../project/schemas/project.schema';
import { User } from '../../user/schemas/user.schema';

export type RegisterDocument = mongoose.HydratedDocument<Register>;

@Schema()
export class Register {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;

  @Prop({ required: true, index: true })
  init_date: Date;

  @Prop({ required: true })
  end_date: Date;

  @Prop({ required: true })
  hours: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  project: Project;
}

export const RegisterSchema = SchemaFactory.createForClass(Register);
