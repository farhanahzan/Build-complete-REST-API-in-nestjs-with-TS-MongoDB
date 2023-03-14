import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(title?:string): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async createBook(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }

  async findById(_id: string): Promise<Book> {
    const book = await this.bookModel.findById(_id);

    if (!book) {
      throw new NotFoundException('Book Not Found');
    }

    return book;
  }

  async updateById(_id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(_id, book, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(_id: string): Promise<Book> {
    const book = await this.bookModel.findByIdAndDelete(_id);

    if (!book) {
      throw new NotFoundException('Book Not Found');
    }

    return book;
  }
}
