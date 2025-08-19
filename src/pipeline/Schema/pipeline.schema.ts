import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PipelineDocument = Pipeline & Document;

@Schema({ timestamps: true })
export class Pipeline extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({
    enum: ['Active', 'Inactive', 'active', 'inactive'],
    required: false,
    default: 'Active',
  })
  status: string;

  @Prop({ required: false, default: 0 })
  noOfMod: number;

  @Prop({ default: () => new Date().toISOString() })
  createdon: string;

  @Prop({ default: 'Admin' })
  createdby: string;
}

export const PipelineSchema = SchemaFactory.createForClass(Pipeline);
