import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Dropdown extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [String], required: true })
  options: string[];

  @Prop({ type: Types.ObjectId, ref: 'Module', required: true })
  moduleId: Types.ObjectId;
}

export const DropdownSchema = SchemaFactory.createForClass(Dropdown);
