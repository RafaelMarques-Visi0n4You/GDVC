import express from 'express';
const router = express.Router();
import { getPlanoSubscricaoEmpresas, getPlanoSubscricaoEmpresaById, createPlanoSubscricaoEmpresa, updatePlanoSubscricaoEmpresa, deletePlanoSubscricaoEmpresa, associarplanosubscricaoempresa } from '../controllers/PlanoSubscricaoEmpresaController.js';
import verificarToken from '../middleware/authMiddleware.js';

router.get('/get', verificarToken, getPlanoSubscricaoEmpresas);
router.get('/get/:id', verificarToken, getPlanoSubscricaoEmpresaById);
router.post('/create', verificarToken, createPlanoSubscricaoEmpresa);
router.put('/update', updatePlanoSubscricaoEmpresa);
router.delete('/delete/:id', verificarToken, deletePlanoSubscricaoEmpresa);
router.post('/associarplanosubscricaoempresa', verificarToken, associarplanosubscricaoempresa);


export default router;