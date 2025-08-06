import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './Schema/book.schema';
import { Model } from 'mongoose';
import { BookDto } from './Dto/book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async getBooks(): Promise<Book[]> {
    const books = await this.bookModel.find();
    if (!books) throw new NotFoundException('books not found');

    return books;
  }

  async getbyId(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) throw new NotFoundException(`book with ${id} is not found`);
    return book;
  }

  async UpdateOneBook(id: string, data: BookDto): Promise<Book | null> {
    const UpdatedBook = await this.bookModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!UpdatedBook)
      throw new NotFoundException(`book with this ${id} is not found `);
    return UpdatedBook;
  }

  async createBooks(dto: BookDto): Promise<Book> {
    const create = await this.bookModel.create(dto);
    console.log(create);

    return create;
  }

  async deleteOnebook(id: string): Promise<Book | null> {
    const deletebook = await this.bookModel.findOneAndDelete({ _id: id });
    return deletebook;
  }
}
