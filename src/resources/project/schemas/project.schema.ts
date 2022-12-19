import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Register } from '../../register/schemas/register.schema';

export type ProjectDocument = mongoose.HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Register' }],
  })
  registers: Register[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
