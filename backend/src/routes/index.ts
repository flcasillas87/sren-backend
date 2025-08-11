import { Application } from 'express';
import consumoRoutes from './consumoRoutes.js';

import notFoundHandler from '../middlewares/notFoundHandler.js';
import errorHandler from '../middlewares/errorHandler.js';

// Función para registrar todas las rutas en la aplicación Express
export function registerRoutes(app: Application): void {
  // Aquí puedes registrar todas las rutas de tu aplicación

  app.use('/', consumoRoutes);

  app.get('/', (_, res) => res.json({ message: 'API funcionando 🚀' }));

  // Middlewares para errores (siempre al final)
  app.use(notFoundHandler);
  app.use(errorHandler);
}
