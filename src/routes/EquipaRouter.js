import express from 'express';
const router = express.Router();
import { getEquipas, getEquipaById, createEquipa, updateEquipa, deleteEquipa, getByDepartamento, gettodasequipas, setAcesso } from '../controllers/EquipaController.js';
import verificarToken from '../middleware/authMiddleware.js';

router.post('/get', verificarToken, getEquipas);
router.get('/getByDepartamento/:id', verificarToken, getByDepartamento);
router.get('/getall', verificarToken, gettodasequipas);
router.get('/get/:id', verificarToken, getEquipaById);
router.post('/create', verificarToken, createEquipa);
router.put('/update/:id', verificarToken, updateEquipa);
router.delete('/delete/:id', verificarToken, deleteEquipa);
router.put('/setAcesso/:id', verificarToken, setAcesso);




export default router;