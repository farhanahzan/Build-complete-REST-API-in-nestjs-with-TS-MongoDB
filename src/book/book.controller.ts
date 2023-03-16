import { Body, Controller, Get, Post } from '@nestjs/common';
import { Delete, Param, Put, Query, Req, UseGuards } from '@nestjs/common/decorators';
import { BookService } from './book.service';
import {  CreateBookDto } from './dto/create-book.dto';
import { updateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';
import {Query as ExpressQuery} from 'express-serve-static-core'
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/schemas/user.schema';
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllBooks(@Query() query?: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createBook(
    @Body()
    book: CreateBookDto,
    @Req()
    req,
  ): Promise<Book> {
    return this.bookService.createBook(book, req.user);
  }
  @Get(':_id')
  @UseGuards(AuthGuard())
  async getBookById(@Param('_id') _id: string): Promise<Book> {
    return this.bookService.findById(_id);
  }

  @Put(':_id')
  @UseGuards(AuthGuard())
  async updateBook(
    @Param('_id')
    _id: string,
    @Body()
    book: updateBookDto,
  ): Promise<Book> {
    return this.bookService.updateById(_id, book);
  }

  @Delete(':_id')
  @UseGuards(AuthGuard())
  async deleteBookById(@Param('_id') _id: string): Promise<Book> {
    return this.bookService.deleteById(_id);
  }
}

