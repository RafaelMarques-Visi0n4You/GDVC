import express from 'express';
const router = express.Router();
import { getUser, createUser } from '../controllers/userController.js';
import verificarToken from '../middleware/authMiddleware.js';

router.get('/getUser', getUser);
router.post('/createUser', verificarToken, createUser);




export default router;