import { Request, Response } from 'express';
import { fetchUsers } from '../services/userService.js';

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await fetchUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo usuarios' });
  }
}
