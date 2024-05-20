import express from 'express';
const router = express.Router();
import { getNotaByVisita, getMotivo, createNotaVisita, updateNotaVisita, deleteNotaVisita } from '../controllers/NotaVisitaController.js';
import verificarToken from '../middleware/authMiddleware.js';


router.post('/get', verificarToken, getNotaByVisita);
router.get('/get/:id', verificarToken, getMotivo);
router.post('/create', verificarToken, createNotaVisita);
router.put('/update/:id', verificarToken, updateNotaVisita);
router.delete('/delete', verificarToken, deleteNotaVisita);


export default router;