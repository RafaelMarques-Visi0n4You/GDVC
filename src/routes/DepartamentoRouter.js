const express = require("express");
const router = express.Router();
const departamentoController = require('../controllers/departamentoController');
const Verificar = require("../controllers/authMiddleware");

router.get('/get',  departamentoController.getDepartamentos);
router.get('/get/:id', departamentoController.getDepartamentoById);
router.post('/create', departamentoController.createDepartamento);
router.put('/update/:id', departamentoController.updateDepartamento);
router.delete('/delete/:id', departamentoController.deleteDepartamento);


module.exports = router;