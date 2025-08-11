import { Application } from 'express';
import userRoutes from './userRoutes.js';
import notFoundHandler from '../middlewares/notFoundHandler.js';
import errorHandler from '../middlewares/errorHandler.js';


// Función para registrar todas las rutas en la aplicación Express
export function registerRoutes(app: Application): void {
  // Aquí puedes registrar todas las rutas de tu aplicación
  app.use('/users', userRoutes);
  app.get('/', (_, res) => res.json({ message: 'API funcionando 🚀' }));
  // Aquí podrías agregar más rutas:
  // app.use('/products', productRoutes);
  // app.use('/orders', orderRoutes);

// Middlewares para errores (siempre al final)
  app.use(notFoundHandler);
  app.use(errorHandler);
}  

