import express from 'express';
const router = express.Router();
import { getTarefasServicosVisita, getTarefaServicoVisitaById, createTarefaServicoVisita, updateStateTarefaServicoVisita, deleteTarefaServicoVisita } from '../controllers/tarefaServicoVisitaController.js';
import verificarToken from '../middleware/authMiddleware.js';

router.get('/get', verificarToken, getTarefasServicosVisita);
router.get('/get/:id1/:id2', verificarToken, getTarefaServicoVisitaById);
router.post('/create', verificarToken, createTarefaServicoVisita);
router.put('/update', verificarToken, updateStateTarefaServicoVisita);
router.delete('/delete/:id', verificarToken, deleteTarefaServicoVisita);



export default router;