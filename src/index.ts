// Carga las variables de entorno desde el archivo .env automáticamente
import 'dotenv/config';

// Importa Express para crear el servidor web
import express from 'express';

// Importa el router de usuarios (asegúrate de que la ruta tenga extensión .js para ESM)
import { usersRouter } from './routes/users.js';

// Importa la conexión a la base de datos MariaDB (misma regla de extensión .js)
import { db } from './db/db.js';

// Crea una instancia de la aplicación Express
const app = express();

// Middleware para parsear JSON en las peticiones entrantes
app.use(express.json());

// Puerto donde escuchará el servidor; usa variable de entorno o 3000 por defecto
const port = process.env.PORT || 3000;

// Ruta de prueba para verificar que la conexión a la base de datos funciona correctamente
app.get('/db-test', async (_req, res) => {
  try {
    // Ejecuta una consulta simple para obtener la fecha/hora actual del servidor de BD
    const [rows] = await db.query('SELECT NOW() as now');
    // Envía la respuesta con el tiempo actual de la BD
    res.json({ db_time: (rows as any)[0].now });
  } catch (err) {
    // Si hay error al conectar o consultar, envía un error 500 con detalles
    res.status(500).json({ error: 'Error conectando a MariaDB', details: err });
  }
});

// Middleware para rutas relacionadas con usuarios
app.use('/users', usersRouter);

// Ruta raíz que responde con un mensaje simple para confirmar que el API está funcionando
app.get('/', (_req, res) => {
  res.json({ message: 'API Express + TypeScript + MariaDB lista 🎉' });
});

// Inicia el servidor y escucha en el puerto configurado
app.listen(port, () => {
  console.log(`🚀 Servidor en http://localhost:${port}`);
});
