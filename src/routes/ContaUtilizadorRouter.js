import express from 'express';
const router = express.Router();
import { getContaUtilizadores, getContaUtilizador, createContaUtilizador, updateContaUtilizador, deleteContaUtilizador, getContaUtilizadoresEmpresa, setAcesso, getcontasclientesempresa, todascontas } from '../controllers/contaUtilizadorController.js';
import verificarToken from "../middleware/authMiddleware.js";

router.get('/get', getContaUtilizadores);
router.get('/get/:id', getContaUtilizador);
router.post('/getByEmpresa', getContaUtilizadoresEmpresa);
router.post('/create', createContaUtilizador);
router.put('/update/:id', updateContaUtilizador);
router.put('/updateToken/:id', updateContaUtilizador);
router.delete('/delete/:id', verificarToken, deleteContaUtilizador);
router.put('/setAcesso/:id', verificarToken, setAcesso);
router.post('/getcontacliente', getcontasclientesempresa);
router.post('/todasAsContas' , todascontas);


export default router;