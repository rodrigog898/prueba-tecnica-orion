import { Book, IBook } from '../models/Book';

export const createBook = async (
  title: string,
  chapters: number,
  pages: number,
  authorsObjectPublicIds: string[]
): Promise<IBook> => {
  const book = new Book({ title, chapters, pages, authors: authorsObjectPublicIds });
  return await book.save();
};


export const getAllBooks = async (): Promise<IBook[]> => {
  return await Book.find().exec();
};


export const getBooksByPublicIds = async (ids: string[]): Promise<IBook[]> => {
  return await Book.find({ id: { $in: ids } }).exec();
};


export const getBookByPublicId = async (publicId: string): Promise<IBook | null> => {
  return await Book.findOne({ id: publicId }).exec();
};
