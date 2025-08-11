import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { registerRoutes } from './routes/index.js';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Registro de rutas
registerRoutes(app);

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
