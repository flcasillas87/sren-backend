import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import * as syncService from './services/syncService.js';
import { createUser } from './controllers/usersController.js';
import { registerRoutes } from './routes/index.js';
import { ensureDataFileExists, syncWithDatabase } from './services/storageService.js';


dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

async function startServer() {
  await ensureDataFileExists();

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Registro de rutas
registerRoutes(app);

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
}
startServer();