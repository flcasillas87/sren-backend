// src/routes/userRoutes.ts
import { Router } from 'express';
import * as userController from '../controllers/userController'; // Importamos todo el módulo de controlador

const router = Router();

// Definición de las rutas para /users
router.get('/', userController.getUsers); // GET /users
router.get('/:id', userController.getUser); // GET /users/:id
router.post('/', userController.createNewUser); // POST /users

export default router;
