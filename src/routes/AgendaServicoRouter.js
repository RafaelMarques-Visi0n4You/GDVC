const express = require("express");
const router = express.Router();
const agendaServico = require('../controllers/agendaServicoController');
const Verificar = require("../controllers/authMiddleware");

router.get('/getDetails', agendaServico.getAgendaServicos);
router.post('/getDetails', agendaServico.getAgendaServicoById);
router.post('/create', agendaServico.createAgendaServico);
router.put('/update/:id', agendaServico.updateAgendaServico);
router.delete('/delete/:id', agendaServico.deleteAgendaServico);



module.exports = router;