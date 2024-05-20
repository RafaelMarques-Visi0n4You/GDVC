const express = require("express");
const router = express.Router();
const ChefeEquipa = require("../controllers/chefeEquipaController");
const Verificar = require("../controllers/authMiddleware");

router.get('/get', ChefeEquipa.getChefesEquipa);
router.get('/get/:id1/:id2', ChefeEquipa.getChefeEquipaById);
router.post('/create', ChefeEquipa.createChefeEquipa);
router.put('/update/:id1/:id2', ChefeEquipa.updateChefeEquipa);
router.delete('/delete/:id1/:id2', ChefeEquipa.deleteChefeEquipa);



module.exports = router;