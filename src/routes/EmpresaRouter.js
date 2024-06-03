import express from 'express';
const router = express.Router();
import { getEmpresas, getEmpresaById, createEmpresa, updateEmpresa, deleteEmpresa, setAcesso, getTodasEmpresas } from '../controllers/empresaController.js';
import verificarToken from '../middleware/authMiddleware.js';


router.post('/get', getEmpresas);
router.get('/get/:id',verificarToken, getEmpresaById);
router.post('/create', verificarToken, createEmpresa);
router.put('/update/:id', verificarToken, updateEmpresa);
router.delete('/delete/:id', verificarToken, deleteEmpresa);
router.put('/setAcesso/:id', verificarToken, setAcesso);
router.get('/get',verificarToken, getTodasEmpresas)


export default router;