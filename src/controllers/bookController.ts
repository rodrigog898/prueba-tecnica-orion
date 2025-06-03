import { Request, Response } from 'express';
import { bookService } from '../services/bookService';

export const bookController = {
  createBook: async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, chapters, pages, authors } = req.body;
      const newBook = await bookService.createNewBook(
        title,
        Number(chapters),
        Number(pages),
        authors
      );
      res.status(201).json(newBook);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  listBooks: async (_req: Request, res: Response): Promise<void> => {
    try {
      const booksWithAuthors = await bookService.listBooks();
      res.status(200).json(booksWithAuthors);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al listar libros' });
    }
  },

  getAveragePagesPerChapter: async (_req: Request, res: Response): Promise<void> => {
    try {
      const averages = await bookService.getAveragePagesPerChapter();
      res.status(200).json(averages);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al calcular promedios' });
    }
  },
};
