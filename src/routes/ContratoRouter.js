const express = require("express");
const router = express.Router();
const contrato = require('../controllers/contratoController');
const Verificar = require("../controllers/authMiddleware");

router.get('/get', contrato.getContratos);
router.post('/get', contrato.getContratoById);
router.post('/create', contrato.createContrato);
router.put('/update/:id', contrato.updateContrato);
router.delete('/delete/:id', contrato.deleteContrato);




module.exports = router;