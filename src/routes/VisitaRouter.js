const express = require("express");
const router = express.Router();
const visita = require('../controllers/visitaController');
const Verificar = require("../controllers/authMiddleware");

router.get('/getAll', visita.getAllVisitas);
router.post('/get', visita.getVisitas);
router.get('/get/:id', visita.getVisitaById);
router.post('/create', visita.createVisita);
router.put('/update/:id', visita.updateVisita);
router.delete('/delete/:id', visita.deleteVisita);
router.put('/updateStatus', visita.updateStatus);


module.exports = router;