const express = require("express");
const router = express.Router();
const contaUtilizadorController = require('../controllers/contaUtilizadorController');
const Verificar = require("../controllers/authMiddleware");

router.get('/get', contaUtilizadorController.getContaUtilizadores);
router.get('/get/:id', contaUtilizadorController.getContaUtilizador);
router.post('/create', contaUtilizadorController.createContaUtilizador);
router.put('/update/:id', contaUtilizadorController.updateContaUtilizador);
router.delete('/delete/:id', contaUtilizadorController.deleteContaUtilizador);


module.exports = router;