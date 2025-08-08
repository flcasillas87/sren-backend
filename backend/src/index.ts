// src/index.ts

import express from 'express';
import 'dotenv/config'; // Carga las variables de entorno desde .env
import { connectDB } from './config/db'; // Importa la función de conexión a DB
import { registerRoutes } from './routes'; // Importa la función para registrar todas las rutas

const app = express();
const port = process.env.PORT || 3000;

// --- Middleware Globales ---
app.use(express.json()); // Habilita el parsing de cuerpos de solicitud JSON
app.use(express.urlencoded({ extended: true })); // Habilita el parsing de datos de formularios URL-encoded

// Opcional: Middleware para logging de solicitudes (ejemplo simple)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// --- Rutas de la API ---
registerRoutes(app); // Registra todas las rutas definidas en './routes/index.ts'

// --- Ruta de Bienvenida (ejemplo) ---
app.get('/', (req, res) => {
  res.send('¡Bienvenido a tu Backend Express con TypeScript! 🚀');
});

// --- Manejo de Rutas No Encontradas (404) ---
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada.' });
});

// --- Manejo de Errores Global (middleware de 4 argumentos) ---
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error('🔥 Error Global Capturado:', err.stack);
    res
      .status(500)
      .json({ message: 'Algo salió mal en el servidor.', error: err.message });
  },
);

// --- Iniciar Servidor y Conectar a DB ---
async function startServer() {
  try {
    await connectDB(); // Conectar a la base de datos antes de iniciar el servidor
    app.listen(port, () => {
      console.log(`🚀 Servidor Express escuchando en http://localhost:${port}`);
      console.log(
        `✨ API Docs disponibles en: http://localhost:${port}/api-docs (si tienes Swagger/OpenAPI)`,
      );
    });
  } catch (error) {
    console.error('❌ Fallo al iniciar el servidor:', error);
    process.exit(1); // Sale del proceso con un código de error
  }
}

startServer();

// Opcional: Manejo de cierre elegante para desconectar la DB
process.on('SIGINT', async () => {
  console.log('\nCerrando servidor...');
  // await disconnectDB(); // Descomentar si quieres desconectar la DB al cerrar
  process.exit(0);
});
