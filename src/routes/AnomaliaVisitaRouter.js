import express from 'express';
import { getAnomaliaVisitaById, createAnomaliaVisita, updateAnomaliaVisita, deleteAnomaliaVisita } from '../controllers/anomaliaVisitaController.js';
import verificarToken from "../middleware/authMiddleware.js";
import upload from '../config/multer.js';


const router = express.Router();

router.post('/get', verificarToken, getAnomaliaVisitaById);
router.post('/create', verificarToken, upload.single('foto'), createAnomaliaVisita);
router.put('/update/:id1', verificarToken, updateAnomaliaVisita);
router.delete('/delete', verificarToken, deleteAnomaliaVisita);


export default router;