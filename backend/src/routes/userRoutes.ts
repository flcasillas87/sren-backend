// src/routes/userRoutes.ts
import { Router } from 'express';
import * as userController from '../controllers/usersController.js';

const router = Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.delete('/:id', userController.removeUser);

export default router;
