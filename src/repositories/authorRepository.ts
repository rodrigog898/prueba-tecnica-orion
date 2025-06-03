import { Author, IAuthor } from '../models/Author';

export const findAuthorsByPublicIds = async (ids: string[]): Promise<IAuthor[]> => {
  return await Author.find({ id: { $in: ids } }).exec();
};

export const createAuthor = async (name: string): Promise<IAuthor> => {
  const author = new Author({ name, books: [] });
  return await author.save();
};

export const getAllAuthors = async (): Promise<IAuthor[]> => {
  return await Author.find().exec();
};

export const addBookIdToAuthorsByPublicIds = async (
  authorPublicIds: string[],
  bookPublicId: string
): Promise<void> => {
  await Author.updateMany(
    { id: { $in: authorPublicIds } },
    { $addToSet: { books: bookPublicId } }
  ).exec();
};
