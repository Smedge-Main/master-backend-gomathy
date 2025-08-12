import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PipelineDocument = Pipeline & Document;

@Schema({ timestamps: true })
export class Pipeline extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ enum: ['active', 'inactive'], required: true })
  status: string;

  @Prop({ required: false, default: 0 })
  noOfMod: number;
}

export const PipelineSchema = SchemaFactory.createForClass(Pipeline);
