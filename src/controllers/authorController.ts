import { Request, Response } from 'express';
import { authorService } from '../services/authorService';

export const authorController = {
  createAuthor: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name } = req.body;
      const newAuthor = await authorService.createAuthor(name);
      res.status(201).json(newAuthor);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  listAuthors: async (_req: Request, res: Response): Promise<void> => {
    try {
      const authorsWithBooks = await authorService.listAuthors();
      res.status(200).json(authorsWithBooks);
    } catch (err: any) {
      res.status(500).json({ error: 'Error al listar autores' });
    }
  },
};
