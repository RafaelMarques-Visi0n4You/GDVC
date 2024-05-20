import express from 'express';
const router = express.Router();
import { getChefesEquipa, getchefeporequipa, getChefeEquipaById, createChefeEquipa, updateChefeEquipa, deleteChefeEquipa } from '../controllers/chefeEquipaController.js';
import verificarToken from "../middleware/authMiddleware.js";

router.get('/get', getChefesEquipa);
router.post('/get', verificarToken, getchefeporequipa);
router.get('/get/:id1/:id2', verificarToken, getChefeEquipaById);
router.post('/create', verificarToken, createChefeEquipa);
router.put('/update', updateChefeEquipa);
router.delete('/delete/:id1/:id2', verificarToken, deleteChefeEquipa);



export default router;