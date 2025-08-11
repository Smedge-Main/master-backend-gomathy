import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Pipeline } from 'src/pipeline/Schema/pipeline.schema';

export type ModuleDocument = Module & Document;

@Schema()
export class Module extends Document {
  @Prop()
  pipeline?: string;

  @Prop()
  name?: string;

  @Prop({ enum: ['active', 'inactive'], required: false })
  status?: string;

  @Prop({ type: Types.ObjectId, ref: Pipeline.name, required: true })
  pipelineId: Types.ObjectId; // Reference to Pipeline
}

export const ModuleSchema = SchemaFactory.createForClass(Module);
