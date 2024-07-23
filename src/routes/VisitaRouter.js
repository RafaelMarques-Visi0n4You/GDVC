import express from 'express';
const router = express.Router();
import { getAllVisitas, getContactDetails, getVisitas, getEmpresaVisitas, getNivel1Visitas, getNivel3Visitas, getVisitasPendentes, getVisitaById, createVisita, updateVisita, deleteVisita, updateStatus, acceptVisit, sendEmailWithoutNextVisit, sendEmailWithNextVisit, getVisitasPendentesNivel4, getvisitasnaorealizadaslvl3, getvisitasnaorealizadaslvl4, updateEstado } from '../controllers/visitaController.js';
import verificarToken from '../middleware/authMiddleware.js';

router.get('/getAll', verificarToken, getAllVisitas);
router.post('/getContactDetails', verificarToken, getContactDetails);
router.post('/get', verificarToken, getVisitas);
router.post('/getByEmpresa', getEmpresaVisitas);
router.post('/getByNivel1', verificarToken, getNivel1Visitas);
router.post('/getByNivel3', verificarToken, getNivel3Visitas);
router.post('/getVisitasPendentes', verificarToken, getVisitasPendentes);
router.post('/getVisitasPendentesnivel4',  getVisitasPendentesNivel4);
router.get('/get/:id', verificarToken, getVisitaById);
router.post('/create', verificarToken, createVisita);
router.put('/update/:id', verificarToken, updateVisita);
router.delete('/delete/:id', verificarToken, deleteVisita);
router.put('/updateStatus', verificarToken, updateStatus);
router.put('/updateestado/:id', verificarToken, updateEstado);
router.put('/acceptVisit', verificarToken, acceptVisit);
router.post('/sendEmailWithoutNextVisit', verificarToken, sendEmailWithoutNextVisit);
router.post('/sendEmailWithNextVisit', verificarToken, sendEmailWithNextVisit);
router.post('/getvisitasnaorealizadaslvl3', getvisitasnaorealizadaslvl3);
router.post('/getvisitasnaorealizadaslvl4' , getvisitasnaorealizadaslvl4);


export default router;