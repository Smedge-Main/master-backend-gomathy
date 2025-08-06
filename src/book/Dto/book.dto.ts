import { IsEmail, IsEmpty, IsNotEmpty } from 'class-validator'

export class BookDto{
    @IsNotEmpty({message:"Name is required"})
    name:string;

    @IsNotEmpty({message :"Email is required"})
    @IsEmail()
    email:string;

    @IsNotEmpty({message : "Bookname is required"})
    bookname : string;

}