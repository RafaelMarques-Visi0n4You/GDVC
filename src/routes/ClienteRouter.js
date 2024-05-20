import express from 'express';
const router = express.Router();
import { getClientes, getCliente, getMyClients, createCliente, updateCliente, deleteCliente, setAcesso } from '../controllers/clienteController.js';
import verificarToken from "../middleware/authMiddleware.js";

router.get('/get', getClientes);
router.get('/get/:id', verificarToken, getCliente);
router.post('/getMyClients', verificarToken, getMyClients);
router.post('/create', verificarToken, createCliente);
router.put('/update/:id', verificarToken, updateCliente);
router.delete('/delete/:id', verificarToken, deleteCliente);
router.put('/setAcesso/:id', verificarToken, setAcesso);


export default router;