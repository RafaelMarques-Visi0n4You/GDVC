import express from 'express';
const router = express.Router();
import { getTipoServicosHasEquipas, getTipoServicosHasEquipasById, createTipoServicosHasEquipas, updateTipoServicosHasEquipas, deleteTipoServicosHasEquipas } from '../controllers/tipoServicosHasEquipas.js';
import verificarToken from '../middleware/authMiddleware.js';

router.get('/get',verificarToken, getTipoServicosHasEquipas);
router.get('/get/:id',verificarToken, getTipoServicosHasEquipasById);
router.post('/create' ,verificarToken, createTipoServicosHasEquipas);
router.put('/update/:id' ,verificarToken, updateTipoServicosHasEquipas);
router.delete('/delete/:id' ,verificarToken, deleteTipoServicosHasEquipas);




export default router;