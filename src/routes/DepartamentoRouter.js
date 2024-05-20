import express from 'express';
const router = express.Router();
import { getDepartamentos, getDepartamentoById, createDepartamento, updateDepartamento, deleteDepartamento, getDepartamentoByEmpresa } from '../controllers/DepartamentoController.js';
import verificarToken from '../middleware/authMiddleware.js';

router.get('/get', getDepartamentos);
router.post('/get', verificarToken, getDepartamentoByEmpresa);
router.get('/get/:id', verificarToken, getDepartamentoById);
router.post('/create', verificarToken, createDepartamento);
router.put('/update/:id', verificarToken, updateDepartamento);
router.delete('/delete/:id', deleteDepartamento);


export default router;