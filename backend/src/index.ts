import express, { Application, Request, Response } from 'express';                    // Importa el framework Express para crear el servidor HTTP
import cors from 'cors';
//import path from 'path';
import morgan from 'morgan';
//import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';  // Importa las rutas de usuarios desde un archivo separado
import dotenv from 'dotenv';                           // Carga las variables de entorno desde el archivo .env automáticamente

// Cargar variables de entorno
dotenv.config();

const app: Application = express();                             // Crea una instancia de la aplicación Express
const port = process.env.PORT || 3000;            // Obtiene el puerto desde variables de entorno, o usa 3000 si no está definido

app.use(express.json());                          // Middleware que permite a Express interpretar datos JSON en el cuerpo de las peticiones

// Middlewares globales
app.use(cors()); // Permitir peticiones desde otros dominios
app.use(morgan('dev')); // Log de solicitudes en consola
app.use(express.json()); // Parsear JSON en body

// Ruta raíz (útil para comprobar que el servidor está vivo)
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API funcionando 🚀' });
});

// Rutas principales
app.use('/users', userRoutes);

// Manejo de rutas no encontradas
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo centralizado de errores (middleware de error)
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Inicia el servidor y escucha en el puerto especificado
app.listen(port, () => {
  console.log(`🚀 Servidor en http://localhost:${port}`);
});
