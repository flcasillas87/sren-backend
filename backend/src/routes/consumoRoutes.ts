import { Router } from 'express';
import * as consumoController from '../controllers/consumoController.js';

const router = Router();

router.post('/centrales', consumoController.agregarCentral);
router.post('/consumos', consumoController.agregarConsumo);

router.get('/centrales', consumoController.getCentrales);
router.get('/consumos', consumoController.getConsumos);

export default router;
