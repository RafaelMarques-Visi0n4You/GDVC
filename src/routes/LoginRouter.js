import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
const router = express.Router();

import { verificarCredenciais } from '../controllers/loginController.js';

router.use(cookieParser());
router.use(bodyParser.json());


router.post('/', verificarCredenciais);



export default router;