const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const loginController = require('../controllers/loginController');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
router.use(bodyParser.json());



router.post('/', loginController.verificarCredenciais);



module.exports = router;