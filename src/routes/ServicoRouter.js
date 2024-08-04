import express from 'express';
const router = express.Router();
import verificarToken from '../middleware/authMiddleware.js';
import { getServicos, getServicosEmpresa, getServico, createServico, updateServico, deleteServico, setAcesso } from '../controllers/servicoController.js';

router.get('/get', verificarToken, getServicos);
router.post('/getServicosEmpresa',verificarToken, getServicosEmpresa);
router.get('/get/:id', verificarToken, getServico);
router.post('/create', verificarToken, createServico);
router.put('/update/:id', verificarToken, updateServico);
router.delete('/delete/:id', verificarToken, deleteServico);
router.put('/setAcesso/:id', verificarToken, setAcesso);




export default router;