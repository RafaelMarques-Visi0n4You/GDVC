import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import { sequelize } from './config/sequelize.js';
import { setupSocket } from './config/socket.js';

import UserRouter from './routes/UserRouter.js';
import LoginRouter from './routes/LoginRouter.js';
import TipoServicoRouter from './routes/TipoServicoRouter.js';
import PlanoSubscricaoRouter from './routes/PlanoSubscricaoRouter.js';
import PlanoSubscricaoEmpresaRouter from './routes/PlanoSubscricaoEmpresaRouter.js';
import EmpresaRouter from './routes/EmpresaRouter.js';
import DepartamentoRouter from './routes/DepartamentoRouter.js';
import EquipaRouter from './routes/EquipaRouter.js';
import FuncionarioRouter from './routes/FuncionarioRouter.js';
import ClienteRouter from './routes/ClienteRouter.js';
import ContaUtilizadorRouter from './routes/ContaUtilizadorRouter.js';
import ServicoRouter from './routes/ServicoRouter.js';
import EquipaHasServicoRouter from './routes/EquipaHasServicoRouter.js';
import ContratoRouter from './routes/ContratoRouter.js';
import ContratoHasServicoRouter from './routes/ContratoHasServicoRouter.js';
import AgendaServicoRouter from './routes/AgendaServicoRouter.js';
import VisitaRouter from './routes/VisitaRouter.js';
import NotaVisitaRouter from './routes/NotaVisitaRouter.js';
import ServicoHasTarefaRouter from './routes/ServicoHasTarefaRouter.js';
import ResponsavelDepartamentoRouter from './routes/ResponsavelDepartamentoRouter.js';
import ChefeEquipaRouter from './routes/ChefeEquipaRouter.js';
import TarefaServicoVisitaRouter from './routes/TarefaServicoVisitaRouter.js';
import AnomaliaVisitaRouter from './routes/AnomaliaVisitaRouter.js';
import verificarToken from "./middleware/authMiddleware.js";
import ContaUtilizador from './models/contaUtilizadores.js';
import Empresas from './models/empresas.js';
import Funcionarios from './models/funcionarios.js';
import Equipas from './models/equipas.js';
import TipoServicosHasEquipas from './routes/TipoServicosHasEquipas.js';


dotenv.config();

const app = express();
const server = http.createServer(app);

setupSocket(server);

app.use(cors());
app.use(bodyParser.json());

app.use('/user', UserRouter);
app.use('/login', LoginRouter);
app.use('/tiposervico', TipoServicoRouter);
app.use('/planosubscricao', PlanoSubscricaoRouter);
app.use('/planosubscricaoempresa', PlanoSubscricaoEmpresaRouter);
app.use('/empresa', EmpresaRouter);
app.use('/departamento', DepartamentoRouter);
app.use('/equipa', EquipaRouter);
app.use('/funcionario', FuncionarioRouter);
app.use('/cliente', ClienteRouter);
app.use('/contautilizador', ContaUtilizadorRouter);
app.use('/servico', ServicoRouter);
app.use('/equipahasservico', EquipaHasServicoRouter);
app.use('/contrato', ContratoRouter);
app.use('/contratohasservico', ContratoHasServicoRouter);
app.use('/agendaservico', AgendaServicoRouter);
app.use('/visita', VisitaRouter);
app.use('/notavisita', NotaVisitaRouter);
app.use('/servicohastarefa', ServicoHasTarefaRouter);
app.use('/responsaveldepartamento', ResponsavelDepartamentoRouter);
app.use('/chefeequipa', ChefeEquipaRouter);
app.use('/tarefaservicovisita', TarefaServicoVisitaRouter);
app.use('/anomaliavisita', AnomaliaVisitaRouter);
app.use('/tiposervicohasequipas', TipoServicosHasEquipas);

app.get('/me', verificarToken, async (req, res) => {
  console.log(req.userId);
  const user = await ContaUtilizador.findByPk(req.userId, {
    attributes: { exclude: ['password'] },
    include: [
      {
        model: Funcionarios,
        attributes: ['nome_completo', 'email', 'funcionario_id', 'empresa_id', 'equipa_id', 'departamento_id'],
        include: [
          {
            model: Empresas,
            attributes: ['nome', 'logo_empresa']
          },
          {
            model: Equipas,
            attributes: ['nome']
          }
        ]
      }
    ]
  });

  if (!user) {
    return res.json({ Error: "Utilizador não encontrado" });
  }

  return res.json({ Status: "Success", user });
});

import nodemailer from 'nodemailer';

app.get('/check', (req, res) => {
  res.status(200).send({ message: "Wecolme to GDVC API" });
});

sequelize.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));


// const HOST = process.env.HOST;
// const PORT = process.env.PORT;
// const URL = `http://${HOST}:${PORT}`;


app.set('port', process.env.PORT || 10000);

server.listen(app.get('port'), () => {
  console.log("Start server on port " + app.get('port'));
})


// server.listen(PORT, HOST, () => {
//   console.log(`Server is running at ${URL}`);
// });
