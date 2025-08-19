import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Dropdown extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({
    enum: ['Active', 'Inactive', 'active', 'inactive'],
    required: false,
    default: 'Active',
  })
  status: string;

  @Prop({ type: [String], required: true })
  options: string[];

  @Prop({ type: Types.ObjectId, ref: 'Module', required: true })
  moduleId: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  createdon: Date;

  @Prop({ default: 'Admin' })
  createdby: string;
}

export const DropdownSchema = SchemaFactory.createForClass(Dropdown);
