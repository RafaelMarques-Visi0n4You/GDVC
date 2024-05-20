const express = require("express");
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');
const Verificar = require("../controllers/authMiddleware");


router.get('/get', funcionarioController.getFuncionarios);
router.get('/get/:id', funcionarioController.getFuncionario);
router.post('/create', funcionarioController.createFuncionario);
router.put('/update/:id', funcionarioController.updateFuncionario);
router.delete('/delete/:id', funcionarioController.deleteFuncionario);





module.exports = router;