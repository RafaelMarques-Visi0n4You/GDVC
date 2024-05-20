const express = require("express");
const router = express.Router();
const HistoricoVisita = require("../controllers/historicoVisitaController");
const Verificar = require("../controllers/authMiddleware");

router.get('/get', HistoricoVisita.getHistoricoVisitas);
router.get('/get/:id', HistoricoVisita.getHistoricoVisitaById);
router.post('/create', HistoricoVisita.createHistoricoVisita);
router.put('/update/:id', HistoricoVisita.updateHistoricoVisita);
router.delete('/delete/:id', HistoricoVisita.deleteHistoricoVisita);

module.exports = router;