import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookDto } from './Dto/book.dto';
import { BookService } from './book.service';
import { Book } from './Schema/book.schema';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBooks(): Promise<Book[]> {
    return this.bookService.getBooks();
  }

  @Get(':id')
  async getbyId(@Param('id') id: string): Promise<Book | null> {
    return this.bookService.getbyId(id);
  }

  @Post()
  async createBooks(@Body() dto: BookDto): Promise<Book> {
    console.log(dto);
    return this.bookService.createBooks(dto);
  }

  @Delete(':id')
  async deleteOnebook(@Param('id') id: string): Promise<Book | null> {
    return this.bookService.deleteOnebook(id);
  }

  @Put(':id')
  async UpdateOneBook(
    @Param('id') id: string,
    @Body() data: BookDto,
  ): Promise<BookDto | null> {
    return this.bookService.UpdateOneBook(id, data);
  }
}
