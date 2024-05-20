const express = require("express");
const router = express.Router();
const planoSubscricaoController = require('../controllers/planoSubscricaoController');
const Verificar = require("../controllers/authMiddleware");

router.get('/get',  planoSubscricaoController.getPlanoSubscricao);
router.get('/get/:id',  planoSubscricaoController.getPlanoSubscricaoById);
router.post('/create',  planoSubscricaoController.createPlanoSubscricao);
router.put('/update/:id', planoSubscricaoController.updatePlanoSubscricao);
router.delete('/delete/:id',  planoSubscricaoController.deletePlanoSubscricao);




module.exports = router;