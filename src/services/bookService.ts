import {
  createBook as createBookRepo,
  getAllBooks as getAllBooksRepo,
  getBookByPublicId
} from '../repositories/bookRepository';
import { IBook } from '../models/Book';
import { authorService } from './authorService';
import { IAuthor } from '../models/Author';
import { findAuthorsByPublicIds } from '../repositories/authorRepository';

export const bookService = {

  createNewBook: async (
    title: string,
    chapters: number,
    pages: number,
    authorsPublicIds: string[]
  ): Promise<IBook> => {
    if (!title.trim()) {
      throw new Error('El título del libro es obligatorio');
    }
    if (chapters <= 0 || pages <= 0) {
      throw new Error('chapters y pages deben ser números positivos');
    }
    if (!Array.isArray(authorsPublicIds) || authorsPublicIds.length === 0) {
      throw new Error('Debe proporcionar al menos un ID de autor (UUID)');
    }

    await authorService.validateAuthorPublicIds(authorsPublicIds);

    const newBook: IBook = await createBookRepo(title, chapters, pages, authorsPublicIds);

    await authorService.associateBookToAuthorsByPublicIds(authorsPublicIds, newBook.id);

    return newBook; 
  },

  listBooks: async (): Promise<(IBook & { authorsData: Pick<IAuthor, 'id' | 'name'>[] })[]> => {
    const books: IBook[] = await getAllBooksRepo();

    if (!books.length) return [];

    const allAuthorIdsSet = new Set<string>();
    books.forEach((b) => {
      b.authors.forEach((aId) => allAuthorIdsSet.add(aId));
    });
    const allAuthorIds = Array.from(allAuthorIdsSet);

    const allAuthors: IAuthor[] = allAuthorIds.length
      ? await findAuthorsByPublicIds(allAuthorIds)
      : [];

    const result = books.map((book) => {
      const authorsData = allAuthors
        .filter((a) => book.authors.includes(a.id))
        .map((a) => ({ id: a.id, name: a.name }));
      return { ...book.toObject(), authorsData };
    });

    return result;
  },

  getAveragePagesPerChapter: async (): Promise<{ bookId: string; average: string }[]> => {
    const books: IBook[] = await getAllBooksRepo();
    return books.map((book) => {
      const avg = book.pages / book.chapters;
      return {
        bookId: book.id,
        average: avg.toFixed(2),
      };
    });
  },

  getBookByPublic: async (publicId: string): Promise<IBook | null> => {
    return await getBookByPublicId(publicId);
  },
};
