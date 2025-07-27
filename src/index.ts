import 'dotenv/config';
import express from 'express';
import { usersRouter } from './routes/users.js'
import { db } from './db/db.js';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

// 🔌 Ruta de prueba conexión DB
app.get('/db-test', async (_req, res) => {
  try {
    const [rows] = await db.query('SELECT NOW() as now');
    res.json({ db_time: (rows as any)[0].now });
  } catch (err) {
    res.status(500).json({ error: 'Error conectando a MariaDB', details: err });
  }
});

// 👥 Rutas de usuarios
app.use('/users', usersRouter);

// 🏠 Ruta raíz
app.get('/', (_req, res) => {
  res.json({ message: 'API Express + TypeScript + MariaDB lista 🎉' });
});

app.listen(port, () => {
  console.log(`🚀 Servidor en http://localhost:${port}`);
});
