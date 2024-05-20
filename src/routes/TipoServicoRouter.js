const express = require("express");
const router = express.Router();
const tipoServicoController = require('../controllers/tipoServicoController');
const Verificar = require("../controllers/authMiddleware");

router.get('/get',  tipoServicoController.getTipoServico);
router.post('/create',  tipoServicoController.createTipoServico);
router.put('/update/:id', tipoServicoController.updateTipoServico);
router.delete('/delete/:id',  tipoServicoController.deleteTipoServico);




module.exports = router;