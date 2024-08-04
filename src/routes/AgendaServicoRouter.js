import express from 'express';
import {
    getAgendaServicos,
    getAgendaServicoById,
    createAgendaServico,
    updateAgendaServico,
    deleteAgendaServico,
    getByEquipas,
    getClientAgendas,
    getByAgendasId,
    createAgendaServicoLVL1
} from '../controllers/agendaServicoController.js';
import verificarToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/getDetails', getAgendaServicos);
router.post('/getDetails', getAgendaServicoById);
router.post('/getClientAgendas', verificarToken, getClientAgendas);
router.post('/getByAgendasId', verificarToken, getByAgendasId);
router.post('/getByEquipas', verificarToken, getByEquipas);
router.post('/create', verificarToken, createAgendaServico);
router.put('/update/:id', verificarToken, updateAgendaServico);
router.delete('/delete/:id', verificarToken, deleteAgendaServico);
router.post('/createLVL1', verificarToken, createAgendaServicoLVL1);

export default router;
