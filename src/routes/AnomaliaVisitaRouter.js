const express = require("express");
const router = express.Router();
const AnomaliaVisita = require("../controllers/anomaliaVisitaController");
const Verificar = require("../controllers/authMiddleware");

router.post('/get', AnomaliaVisita.getAnomaliaVisitaById);
router.post('/create', AnomaliaVisita.createAnomaliaVisita);
router.put('/update/:id1', AnomaliaVisita.updateAnomaliaVisita);
router.delete('/delete', AnomaliaVisita.deleteAnomaliaVisita);



module.exports = router;