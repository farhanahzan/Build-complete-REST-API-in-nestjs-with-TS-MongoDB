import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from './schemas/book.schema';
import { Query } from 'express-serve-static-core';
import { BadRequestException } from '@nestjs/common/exceptions';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {

    const resPerPage =10
    const currentPage = Number(query.page) || 1
    const skip = resPerPage * (currentPage-1)
    const keyword = query.keyword
      ? {
          $or: [
            {
              title: {
                $regex: query.keyword,
                $options: 'i',
              },
            },
            {
              author: {
                $regex: query.keyword,
                $options: 'i',
              },
            },
            {
              description: {
                $regex: query.keyword,
                $options: 'i',
              },
            },
            

            {
              category: {
                $regex: query.keyword,
                $options: 'i',
              },
            },
          ],
        }
      : {};
      
    //db.books.find({ title: { $regex: /JavaScript/i } })
    const books = await this.bookModel.find({ ...keyword }).limit(resPerPage).skip(skip);
    // console.log(books)
    return books;
  }

  async createBook(book: Book, user:User): Promise<Book> {

    const data = Object.assign(book, {user:user._id})
    const res = await this.bookModel.create(data);
    return res;
  }

  async findById(_id: string): Promise<Book> {

    const isValidId = mongoose.isValidObjectId(_id)
    if(!isValidId){
      throw new BadRequestException('Please enter Correct Id')
    }


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
