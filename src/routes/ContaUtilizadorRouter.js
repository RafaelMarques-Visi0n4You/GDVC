import express from 'express';
const router = express.Router();
import { getContaUtilizadores, getContaUtilizador, createContaUtilizador, updateContaUtilizador, deleteContaUtilizador, getContaUtilizadoresEmpresa, setAcesso } from '../controllers/contaUtilizadorController.js';
import verificarToken from "../middleware/authMiddleware.js";

router.get('/get', getContaUtilizadores);
router.get('/get/:criado_por_id', getContaUtilizador);
router.post('/getByEmpresa', getContaUtilizadoresEmpresa);
router.post('/create', verificarToken, createContaUtilizador);
router.put('/update/:id', verificarToken, updateContaUtilizador);
router.put('/updateToken/:id', updateContaUtilizador);
router.delete('/delete/:id', verificarToken, deleteContaUtilizador);
router.put('/setAcesso/:id', verificarToken, setAcesso);


export default router;