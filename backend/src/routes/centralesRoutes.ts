import { Router } from 'express';
import * as centralesController from '../controllers/consumoController.js';

const router = Router();

router.post('/centrales', consumoController.agregarConsumo);
router.get('/centrales', consumoController.getConsumos);

export default router;
