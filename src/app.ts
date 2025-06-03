
import express, { Application, json } from 'express';
import morgan from 'morgan';    
import cors from 'cors';        
import authorRoutes from './routes/authorRoutes';
import bookRoutes from './routes/bookRoutes';

export const createApp = (): Application => {
  const app = express();


  app.use(cors());
  app.use(json());
  app.use(morgan('dev'));


  app.use('/api/authors', authorRoutes);
  app.use('/api/books', bookRoutes);


  app.get('/api/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
  });


  app.use((_req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
  });

  return app;
};
