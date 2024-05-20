import express from 'express';
const router = express.Router();
import { getFuncionarios, getFuncionariosChefeEquipa, getfuncionariosequipa, getReponsvaelDepartamento, getFuncionario, createFuncionario, updateFuncionario, deleteFuncionario, setAcesso } from '../controllers/FuncionarioController.js';
import verificarToken from '../middleware/authMiddleware.js';


router.post('/getfuncionarioempresa', verificarToken, getFuncionarios);
router.post('/get',verificarToken, getFuncionariosChefeEquipa);
router.post('/getfuncionariosequipa', getfuncionariosequipa);
router.post('/getresponsaveldepartamento', getReponsvaelDepartamento);
router.get('/get/:id', verificarToken, getFuncionario);
router.post('/create', createFuncionario);
router.put('/update/:id', verificarToken, updateFuncionario);
router.delete('/delete/:id', verificarToken, deleteFuncionario);
router.put('/setAcesso/:id', verificarToken, setAcesso);





export default router;