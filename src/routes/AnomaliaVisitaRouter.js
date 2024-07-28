import express from 'express';
import { getAnomaliaVisitaById, createAnomaliaVisita, updateAnomaliaVisita, deleteAnomaliaVisita, createAnomaliaVisitaSemFoto } from '../controllers/anomaliaVisitaController.js';
import verificarToken from "../middleware/authMiddleware.js";
import multerUploads from '../config/multer.js';


const router = express.Router();

router.post('/get', verificarToken, getAnomaliaVisitaById);
router.post('/create', verificarToken, multerUploads, createAnomaliaVisita);
router.put('/update/:id1', verificarToken, updateAnomaliaVisita);
router.delete('/delete', verificarToken, deleteAnomaliaVisita);
router.post('/createSemFoto', verificarToken, createAnomaliaVisitaSemFoto);


export default router;