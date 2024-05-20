const express = require("express");
const router = express.Router();
const NotaVisita = require("../controllers/notaVisitaController");
const Verificar = require("../controllers/authMiddleware");


router.post('/get', NotaVisita.getNotaByVisita);
router.post('/create', NotaVisita.createNotaVisita);
router.put('/update/:id', NotaVisita.updateNotaVisita);
router.delete('/delete', NotaVisita.deleteNotaVisita);


module.exports = router;