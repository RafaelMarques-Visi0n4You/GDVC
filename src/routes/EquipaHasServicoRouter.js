import express from 'express';
const router = express.Router();
import { getEquipaHasServicos, getEquipaHasServicoById, createEquipaHasServico, updateEquipaHasServico, deleteEquipaHasServico } from '../controllers/equipaHasServicoController.js';
import verificarToken from '../middleware/authMiddleware.js';

router.get('/get', verificarToken, getEquipaHasServicos);
router.get('/get/:id1/:id2', verificarToken, getEquipaHasServicoById);
router.post('/create', verificarToken, createEquipaHasServico);
router.put('/update/:id1/:id2', verificarToken, updateEquipaHasServico);
router.delete('/delete/:id1/:id2', verificarToken, deleteEquipaHasServico);



export default router;