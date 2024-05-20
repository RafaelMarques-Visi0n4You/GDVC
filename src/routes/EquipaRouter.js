const express = require("express");
const router = express.Router();
const equipaController = require('../controllers/equipaController');
const Verificar = require("../controllers/authMiddleware");

router.get('/get',  equipaController.getEquipas);
router.get('/get/:id', equipaController.getEquipaById);
router.post('/create', equipaController.createEquipa);
router.put('/update/:id', equipaController.updateEquipa);
router.delete('/delete/:id', equipaController.deleteEquipa);




module.exports = router;