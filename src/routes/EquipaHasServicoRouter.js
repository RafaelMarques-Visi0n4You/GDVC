const express = require("express");
const router = express.Router();
const equipaHasServico = require('../controllers/equipaHasServicoController.js');
const Verificar = require("../controllers/authMiddleware");

router.get('/get', equipaHasServico.getEquipaHasServicos);
router.get('/get/:id1/:id2', equipaHasServico.getEquipaHasServicoById);
router.post('/create', equipaHasServico.createEquipaHasServico);
router.put('/update/:id1/:id2', equipaHasServico.updateEquipaHasServico);
router.delete('/delete/:id1/:id2', equipaHasServico.deleteEquipaHasServico);



module.exports = router;