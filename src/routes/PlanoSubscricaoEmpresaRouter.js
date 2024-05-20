const express = require("express");
const router = express.Router();
const planoSubscricaoEmpresaController = require('../controllers/planoSubscricaoEmpresaController');
const Verificar = require("../controllers/authMiddleware");

router.get('/get',  planoSubscricaoEmpresaController.getPlanoSubscricaoEmpresas);
router.get('/get/:id',  planoSubscricaoEmpresaController.getPlanoSubscricaoEmpresaById);
router.post('/create',  planoSubscricaoEmpresaController.createPlanoSubscricaoEmpresa);
router.put('/update/:id',  planoSubscricaoEmpresaController.updatePlanoSubscricaoEmpresa);
router.delete('/delete/:id',  planoSubscricaoEmpresaController.deletePlanoSubscricaoEmpresa);


module.exports = router;