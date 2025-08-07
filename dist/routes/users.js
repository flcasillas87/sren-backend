import { Router } from 'express';
import { db } from '../db/db.js'; // Importa conexión a MariaDB
import { z } from 'zod'; // Librería para validación de esquemas
export const usersRouter = Router();
// ✅ Esquema Zod para validar los datos de usuario entrantes
const userSchema = z.object({
    name: z.string().min(2), // Nombre: string mínimo 2 caracteres
    email: z.string().email() // Email: string con formato válido de email
});
// 📌 GET /users - Listar todos los usuarios
usersRouter.get('/', async (_req, res) => {
    // Ejecuta consulta para obtener todos los registros de la tabla 'users'
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows); // Devuelve el arreglo de usuarios en JSON
});
// 📌 POST /users - Crear un nuevo usuario
usersRouter.post('/', async (req, res) => {
    try {
        // Valida y transforma el cuerpo de la petición según el esquema userSchema
        const data = userSchema.parse(req.body);
        // Inserta el nuevo usuario en la base de datos usando placeholders para evitar inyección SQL
        await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [
            data.name,
            data.email
        ]);
        // Responde con éxito y devuelve el usuario creado
        res.status(201).json({ message: 'Usuario creado', user: data });
    }
    catch (err) {
        // Si la validación falla o hay otro error, responde con 400 y detalles del error
        res.status(400).json({ error: 'Datos inválidos', details: err });
    }
});
// 📌 PUT /users/:id - Actualizar un usuario existente
usersRouter.put('/:id', async (req, res) => {
    try {
        // Permite datos parciales para actualizar solo campos enviados
        const data = userSchema.partial().parse(req.body);
        const { id } = req.params;
        // Actualiza el usuario con el id dado; usa objeto para SET dinámico
        await db.query('UPDATE users SET ? WHERE id = ?', [data, id]);
        res.json({ message: 'Usuario actualizado', user: data });
    }
    catch (err) {
        res.status(400).json({ error: 'Datos inválidos', details: err });
    }
});
// 📌 DELETE /users/:id - Eliminar un usuario
usersRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    // Elimina el usuario con el id especificado
    await db.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'Usuario eliminado' });
});
