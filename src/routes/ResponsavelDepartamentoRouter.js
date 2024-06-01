import express from 'express';
const router = express.Router();
import { getResponsavelDepartamentos, getResponsavelDepartamentoById, createResponsavelDepartamento, updateResponsavelDepartamento, deleteResponsavelDepartamento, getresponvalpordepartamento, getresponsaveldetails, criarcontautilizador, verficarresponsavel } from '../controllers/responsavelDepartamentoController.js';
import verificarToken from '../middleware/authMiddleware.js';

router.post('/getresponvalpordepartamento',verificarToken, getresponvalpordepartamento);
router.get('/get', getResponsavelDepartamentos);
router.get('/get/:id1/:id2', verificarToken, getResponsavelDepartamentoById);
router.post('/create', createResponsavelDepartamento);
router.put('/update',  updateResponsavelDepartamento);
router.delete('/delete/:id1/:id2', verificarToken, deleteResponsavelDepartamento);
router.post('/getone', getresponsaveldetails)
router.post('/verficarresponsavel',verificarToken, verficarresponsavel);
router.post('/criarcontautilizador',verificarToken, criarcontautilizador);




export default router;