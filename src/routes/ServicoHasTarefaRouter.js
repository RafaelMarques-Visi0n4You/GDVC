const express = require("express");
const router = express.Router();
const ServicoHasTarefa = require("../controllers/servicoHasTarefaController");
const Verificar = require("../controllers/authMiddleware");

router.get('/get', ServicoHasTarefa.getServicoHasTarefas);
router.get('/get/:id', ServicoHasTarefa.getServicoHasTarefaById);
router.post('/create', ServicoHasTarefa.createServicoHasTarefa);
router.put('/update/:id', ServicoHasTarefa.updateServicoHasTarefa);
router.delete('/delete/:id', ServicoHasTarefa.deleteServicoHasTarefa);


module.exports = router;