import express from 'express';
const router = express.Router();
import { getContratoHasServicos, getContratoHasServicoById, createContratoHasServico, updateContratoHasServico, deleteContratoHasServico } from '../controllers/contratoHasServicoController.js';
import verificarToken from '../middleware/authMiddleware.js';

router.get('/get', verificarToken, getContratoHasServicos);
router.get('/get/:id1/:id2', verificarToken, getContratoHasServicoById);
router.post('/create', verificarToken, createContratoHasServico);
router.put('/update/:id1/:id2', verificarToken, updateContratoHasServico);
router.delete('/delete/:id1/:id2', verificarToken, deleteContratoHasServico);


export default router;