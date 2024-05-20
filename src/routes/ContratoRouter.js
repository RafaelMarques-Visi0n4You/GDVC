import express from 'express';
const router = express.Router();
import { getContratos, getContratoById, getClientContract, createContrato, updateContrato, deleteContrato, setAcesso } from '../controllers/contratoController.js';
import verificarToken from '../middleware/authMiddleware.js';

router.get('/get', verificarToken, getContratos);
router.post('/get', verificarToken, getContratoById);
router.post('/getClientContract', verificarToken, getClientContract);
router.post('/create', verificarToken, createContrato);
router.put('/update/:id', verificarToken, updateContrato);
router.delete('/delete/:id', verificarToken, deleteContrato);
router.put('/setAcesso/:id', verificarToken, setAcesso);

export default router;