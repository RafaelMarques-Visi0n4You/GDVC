const express = require("express");
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const Verificar = require("../controllers/authMiddleware");

router.get('/get', clienteController.getClientes);
router.get('/get/:id', clienteController.getCliente);
router.post('/create', clienteController.createCliente);
router.put('/update/:id', clienteController.updateCliente);
router.delete('/delete/:id', clienteController.deleteCliente);


module.exports = router;