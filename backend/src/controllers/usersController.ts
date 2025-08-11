// src/controllers/userController.ts
import { Request, Response } from 'express';
import * as userService from '../services/userService.js';

// Lógica para crear un nuevo usuario
export async function createUser(req: Request, res: Response) {
  const userData = req.body;
  const result = await userService.createUser(userData);
  if (result.success) {
    res.status(201).json(result.user);
  } else {
    res.status(202).json({ message: result.message });
  }
}

// Lógica para obtener todos los usuarios
export async function getUsers(req: Request, res: Response) {
  res.json({ message: 'getUsers funcionando' });
}


export async function getUser(req: Request, res: Response) {
  // lógica para obtener un usuario por id
  const id = req.params.id;
  res.json({ message: `getUser con id ${id} funcionando` });
}

// Eliminar un usuario por id
export async function removeUser(req: Request, res: Response) {
  // lógica para eliminar usuario por id
  const id = req.params.id;
  res.json({ message: `removeUser con id ${id} funcionando` });
}
