const express = require("express");
const router = express.Router();
const servico = require('../controllers/servicoController');
const Verificar = require("../controllers/authMiddleware");

router.get('/get', servico.getServicos);
router.get('/get/:id', servico.getServico);
router.post('/create', servico.createServico);
router.put('/update/:id', servico.updateServico);
router.delete('/delete/:id', servico.deleteServico);




module.exports = router;