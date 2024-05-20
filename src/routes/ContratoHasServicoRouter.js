const express = require("express");
const router = express.Router();
const contratoHasServico = require('../controllers/contratoHasServicoController.js');
const Verificar = require("../controllers/authMiddleware");

router.get('/get', contratoHasServico.getContratoHasServicos);
router.get('/get/:id1/:id2', contratoHasServico.getContratoHasServicoById);
router.post('/create', contratoHasServico.createContratoHasServico);
router.put('/update/:id1/:id2', contratoHasServico.updateContratoHasServico);
router.delete('/delete/:id1/:id2', contratoHasServico.deleteContratoHasServico);



module.exports = router;