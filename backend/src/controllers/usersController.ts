// src/controllers/userController.ts
import { Request, Response } from 'express';
import * as userService from '../services/userService.js';

export function getUsers(req: Request, res: Response): void {
  res.json(userService.getAllUsers());
}

export function getUser(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const user = userService.getUserById(id);
  if (!user) {
    res.status(404).json({ error: 'Usuario no encontrado' });
    return;
  }
  res.json(user);
}

export function createUser(req: Request, res: Response): void {
  const user = userService.createUser(req.body);
  res.status(201).json(user);
}

export function removeUser(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const deleted = userService.deleteUser(id);
  if (!deleted) {
    res.status(404).json({ error: 'Usuario no encontrado' });
    return;
  }
  res.status(204).send();
}