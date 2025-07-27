import { Router } from 'express';
import { db } from '../db/db.js';
import { z } from 'zod';

export const usersRouter = Router();

// ✅ Esquema de validación
const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email()
});

// 📌 GET: listar usuarios
usersRouter.get('/', async (_req, res) => {
  const [rows] = await db.query('SELECT * FROM users');
  res.json(rows);
});

// 📌 POST: crear usuario
usersRouter.post('/', async (req, res) => {
  try {
    const data = userSchema.parse(req.body);

    await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [
      data.name,
      data.email
    ]);

    res.status(201).json({ message: 'Usuario creado', user: data });
  } catch (err) {
    res.status(400).json({ error: 'Datos inválidos', details: err });
  }
});

// 📌 PUT: actualizar usuario
usersRouter.put('/:id', async (req, res) => {
  try {
    const data = userSchema.partial().parse(req.body);
    const { id } = req.params;

    await db.query('UPDATE users SET ? WHERE id = ?', [data, id]);

    res.json({ message: 'Usuario actualizado', user: data });
  } catch (err) {
    res.status(400).json({ error: 'Datos inválidos', details: err });
  }
});

// 📌 DELETE: eliminar usuario
usersRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM users WHERE id = ?', [id]);
  res.json({ message: 'Usuario eliminado' });
});
