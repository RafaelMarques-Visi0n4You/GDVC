import express from 'express';
const router = express.Router();
import { getPlanoSubscricao, getPlanoSubscricaoById, createPlanoSubscricao, updatePlanoSubscricao, deletePlanoSubscricao } from '../controllers/PlanoSubscricaoController.js';
import verificarToken from '../middleware/authMiddleware.js';

router.get('/get', verificarToken, getPlanoSubscricao);
router.get('/get/:id', verificarToken, getPlanoSubscricaoById);
router.post('/create', verificarToken, createPlanoSubscricao);
router.put('/update/:id', verificarToken, updatePlanoSubscricao);
router.delete('/delete/:id', verificarToken, deletePlanoSubscricao);




export default router;