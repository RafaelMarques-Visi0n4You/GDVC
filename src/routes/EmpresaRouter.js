const express = require("express");
const router = express.Router();
const empresaController = require('../controllers/empresaController');
const Verificar = require("../controllers/authMiddleware");

router.get('/get',  empresaController.getEmpresas);
router.get('/get/:id',  empresaController.getEmpresaById);
router.post('/create',  empresaController.createEmpresa);
router.put('/update/:id',  empresaController.updateEmpresa);
router.delete('/delete/:id',  empresaController.deleteEmpresa);


module.exports = router;