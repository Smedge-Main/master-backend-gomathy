import { Injectable } from "@nestjs/common";
import { InjectModel, Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BookModule } from "../book.module";

export type BookDocument = Book & Document ;
                         // class + mongoose document

// @InjectModel (Book.name ) private BookModule : <BookDocument>        

//@InjectModel(Book.name) = NestJS decorator used to inject (pass) your MongoDB model into your service.

@Schema()
export class Book  extends Document //(table/collection name)//
{
@Prop({required : true})
name:string

@Prop({required:true})
email:string

@Prop({required:true})
bookname:string
}




export const BookSchema = SchemaFactory.createForClass(Book);


