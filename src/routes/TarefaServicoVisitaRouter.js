const express = require("express");
const router = express.Router();
const TarefaServicoVisita = require("../controllers/tarefaServicoVisitaController");
const Verificar = require("../controllers/authMiddleware");

router.get('/get', TarefaServicoVisita.getTarefasServicosVisita);
router.get('/get/:id1/:id2', TarefaServicoVisita.getTarefaServicoVisitaById);
router.post('/create', TarefaServicoVisita.createTarefaServicoVisita);
router.put('/update', TarefaServicoVisita.updateStateTarefaServicoVisita);
router.delete('/delete/:id', TarefaServicoVisita.deleteTarefaServicoVisita);



module.exports = router;