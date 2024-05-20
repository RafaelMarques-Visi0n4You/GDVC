const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const Verificar = require("../controllers/authMiddleware");

router.get('/getUser', userController.getUser);
router.post('/createUser',userController.createUser);




module.exports = router;