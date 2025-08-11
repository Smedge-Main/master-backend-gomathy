import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PipelineDocument = Pipeline & Document;

@Schema()
export class Pipeline extends Document {
  @Prop()
  name?: string;

  @Prop({ enum: ['active', 'inactive'], required: false })
  status?: string;
}

export const PipelineSchema = SchemaFactory.createForClass(Pipeline);
