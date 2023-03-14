import { Body, Controller, Get, Post } from '@nestjs/common';
import { Delete, Param, Put, Query } from '@nestjs/common/decorators';
import { BookService } from './book.service';
import {  CreateBookDto } from './dto/create-book.dto';
import { updateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(@Query('title') title?: string): Promise<Book[]> {
    return this.bookService.findAll(title);
  }

  @Post()
  async createBook(
    @Body()
    book: CreateBookDto,
  ): Promise<Book> {
    return this.bookService.createBook(book);
  }
  @Get(':_id')
  async getBookById(@Param('_id') _id: string): Promise<Book> {
    return this.bookService.findById(_id);
  }

  @Put(':_id')
  async updateBook(
    @Param('_id')
    _id: string,
    @Body()
    book: updateBookDto,
  ): Promise<Book> {
    return this.bookService.updateById(_id, book);
  }

  @Delete(':_id')
  async deleteBookById(@Param('_id') _id: string): Promise<Book> {
    return this.bookService.deleteById(_id);
  }
}

