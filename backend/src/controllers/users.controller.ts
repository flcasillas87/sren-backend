// src/controllers/userController.ts
import { Request, Response } from 'express';
import * as userService from '../services/userService'; // Importamos todo el módulo de servicio

/**
 * Obtiene todos los usuarios y los envía como respuesta.
 */
export async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
}

/**
 * Obtiene un usuario por ID y lo envía como respuesta.
 */
export async function getUser(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado.' });
    }
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
}

/**
 * Crea un nuevo usuario.
 */
export async function createNewUser(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      res
        .status(400)
        .json({ message: 'Nombre y correo electrónico son requeridos.' });
      return;
    }
    const newUser = await userService.createUser(name, email);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
}
