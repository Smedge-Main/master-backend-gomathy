import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// @Schema({ timestamps: true })
// export class Dropdown extends Document {
//   @Prop({ required: true })
//   name: string;

//   @Prop({
//     enum: ['Active', 'Inactive', 'active', 'inactive'],
//     required: false,
//     default: 'Active',
//   })
//   status: string;

//   @Prop({ type: [String], required: true })
//   options: string[];
//   @Prop({ default: true })
//   enabled: boolean;

//   @Prop({ type: Types.ObjectId, ref: 'Module', required: true })
//   moduleId: Types.ObjectId;

//   @Prop({ type: Date, default: Date.now })
//   createdon: Date;

//   @Prop({ default: 'Admin' })
//   createdby: string;
// }

// export const DropdownSchema = SchemaFactory.createForClass(Dropdown);

// dropdown.schema.ts
@Schema()
export class DropdownOption {
  @Prop({ required: true })
  value: string;

  @Prop({ default: true })
  enabled: boolean;
}

export const DropdownOptionSchema =
  SchemaFactory.createForClass(DropdownOption);

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

  @Prop({ type: [DropdownOptionSchema], default: [] })
  options: DropdownOption[];

  @Prop({ default: true })
  enabled: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Module', required: true })
  moduleId: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  createdon: Date;

  @Prop({ default: 'Admin' })
  createdby: string;
}

export default SchemaFactory.createForClass(Dropdown);
