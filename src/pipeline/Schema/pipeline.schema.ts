import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PipelineDocument = Pipeline & Document;
// class + mongoose document

// @InjectModel (Book.name ) private BookModule : <BookDocument>

//@InjectModel(Book.name) = NestJS decorator used to inject (pass) your MongoDB model into your service.

@Schema() //(table/collection name)//
export class Pipeline extends Document {
  @Prop()
  name?: string;

  @Prop({ enum: ['active', 'inactive'],required:false })
  status?: string;
}

export const PipelineSchema = SchemaFactory.createForClass(Pipeline);
