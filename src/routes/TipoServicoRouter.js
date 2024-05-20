import express from 'express';
const router = express.Router();
import { getTipoServicos, getTipoServico, createTipoServico, updateTipoServico, deleteTipoServico } from '../controllers/TipoServicoController.js';
import verificarToken from '../middleware/authMiddleware.js';

router.get('/get', verificarToken, getTipoServicos);
router.get('/get/:tipo_servico_id', getTipoServico);
router.post('/create', verificarToken, createTipoServico);
router.put('/update/:id', verificarToken, updateTipoServico);
router.delete('/delete/:id', verificarToken, deleteTipoServico);




export default router;