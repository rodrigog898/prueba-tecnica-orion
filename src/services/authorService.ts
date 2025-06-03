import {
  createAuthor as createAuthorRepo,
  getAllAuthors as getAllAuthorsRepo,
  findAuthorsByPublicIds,
  addBookIdToAuthorsByPublicIds
} from '../repositories/authorRepository';
import { IAuthor } from '../models/Author';
import { getBooksByPublicIds } from '../repositories/bookRepository';
import { IBook } from '../models/Book';

export const authorService = {

  createAuthor: async (name: string): Promise<IAuthor> => {
    if (!name.trim()) {
      throw new Error('El nombre del autor es obligatorio');
    }
    return await createAuthorRepo(name);
  },

  listAuthors: async (): Promise<
    (IAuthor & { booksData: { id: string; title: string }[] })[]
  > => {
    const authors: IAuthor[] = await getAllAuthorsRepo();

    if (!authors.length) return [];

    const allBookIdsSet = new Set<string>();
    authors.forEach((a) => {
      a.books.forEach((bId) => allBookIdsSet.add(bId));
    });
    const allBookIds = Array.from(allBookIdsSet);

    const allBooks: IBook[] = allBookIds.length
      ? await getBooksByPublicIds(allBookIds)
      : [];

    const result = authors.map((author) => {
      const booksData = allBooks
        .filter((b) => author.books.includes(b.id))
        .map((b) => ({ id: b.id, title: b.title }));
      return { ...author.toObject(), booksData };
    });

    return result;
  },


  validateAuthorPublicIds: async (publicIds: string[]): Promise<void> => {
    const authors: IAuthor[] = await findAuthorsByPublicIds(publicIds);
    if (authors.length !== publicIds.length) {
      throw new Error('Alguno(s) de los IDs de autor (UUID) no existe(n)');
    }
  },

  associateBookToAuthorsByPublicIds: async (
    authorPublicIds: string[],
    bookPublicId: string
  ): Promise<void> => {
    await addBookIdToAuthorsByPublicIds(authorPublicIds, bookPublicId);
  },
};
