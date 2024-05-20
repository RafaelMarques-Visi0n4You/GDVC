import express from 'express';
const router = express.Router();
import { getResponsavelDepartamentos,getResponsavel, getResponsavelDepartamentoById, createResponsavelDepartamento, updateResponsavelDepartamento, deleteResponsavelDepartamento, getresponvalpordepartamento } from '../controllers/responsavelDepartamentoController.js';
import verificarToken from '../middleware/authMiddleware.js';

router.post('/getresponvalpordepartamento', getresponvalpordepartamento);
router.get('/get', getResponsavelDepartamentos);
router.get('/get/:id1/:id2', verificarToken, getResponsavelDepartamentoById);
router.post('/create', createResponsavelDepartamento);
router.put('/update', verificarToken, updateResponsavelDepartamento);
router.delete('/delete/:id1/:id2', verificarToken, deleteResponsavelDepartamento);
router.post('/getone', getResponsavel)




export default router;