const express = require("express");
const router = express.Router();
const ResponsavelDepartamento = require("../controllers/responsavelDepartamentoController");
const Verificar = require("../controllers/authMiddleware");

router.get('/get', ResponsavelDepartamento.getResponsavelDepartamentos);
router.get('/get/:id1/:id2', ResponsavelDepartamento.getResponsavelDepartamentoById);
router.post('/create', ResponsavelDepartamento.createResponsavelDepartamento);
router.put('/update/:id1/:id2', ResponsavelDepartamento.updateResponsavelDepartamento);
router.delete('/delete/:id1/:id2', ResponsavelDepartamento.deleteResponsavelDepartamento);



module.exports = router;