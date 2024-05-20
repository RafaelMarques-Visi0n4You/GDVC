import express from 'express';
const router = express.Router();
import { getServicoHasTarefas, getServicoHasTarefaById, createServicoHasTarefa, updateServicoHasTarefa, deleteServicoHasTarefa } from '../controllers/servicoHasTarefaController.js';
import verificarToken from '../middleware/authMiddleware.js';

router.get('/get', verificarToken, getServicoHasTarefas);
router.get('/get/:id', verificarToken, getServicoHasTarefaById);
router.post('/create', verificarToken, createServicoHasTarefa);
router.put('/update/:id', verificarToken, updateServicoHasTarefa);
router.delete('/delete/:id', verificarToken, deleteServicoHasTarefa);


export default router;