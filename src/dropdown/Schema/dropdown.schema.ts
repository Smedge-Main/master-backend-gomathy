import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Dropdown extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ enum: ['active', 'inactive'], required: false })
  status?: string;

  @Prop({ type: [String], required: true })
  options: string[];

  @Prop({ type: Types.ObjectId, ref: 'Module', required: true })
  moduleId: Types.ObjectId;

  // @Prop({ type: Number, default: 0 })
  // noOfdropdown?: number;

  @Prop({ default: () => new Date().toISOString() })
  createdon: string;

  @Prop({ default: 'Admin' })
  createdby: string;
}

export const DropdownSchema = SchemaFactory.createForClass(Dropdown);
