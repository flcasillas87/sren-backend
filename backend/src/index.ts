import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';

// Cargar variables de entorno
dotenv.config();

// Inicializar aplicación
const app: Application = express();
const port = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());              // Permitir peticiones desde otros dominios
app.use(morgan('dev'));       // Mostrar logs de peticiones en consola
app.use(express.json());      // Parsear JSON en body

// Ruta raíz (para comprobar que el servidor funciona)
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API funcionando 🚀' });
});

// Rutas principales
app.use('/users', userRoutes);

// Manejo de rutas no encontradas
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo centralizado de errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
