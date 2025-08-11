import { Router } from 'express';
import * as centralesController from '../controllers/centrales.controller.js';

const router = Router();

router.post('/', centralesController.agregarCentral);

export default router;
