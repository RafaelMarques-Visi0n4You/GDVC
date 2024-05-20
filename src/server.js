const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser'); // Import body-parser middleware
const app = express();
const { sequelize } = require('./config/sequelize');
const UserRouter = require('./routes/UserRouter.js');
const ContaUtilizador = require('./models/contaUtilizadores');
const Funcionario = require('./models/funcionarios');
const Verificar = require("./controllers/authMiddleware");
const LoginRouter = require('./routes/LoginRouter.js');
const TipoServico = require('./routes/TipoServicoRouter.js');
const PlanoSubscricao = require('./routes/PlanoSubscricaoRouter.js');
const PlanoSubscricaoEmpresaRouter = require('./routes/PlanoSubscricaoEmpresaRouter.js');
const Empresa = require('./routes/EmpresaRouter.js');
const Departamento = require('./routes/DepartamentoRouter.js');
const Equipa = require('./routes/EquipaRouter.js');
const Funcionarios = require('./routes/FuncionarioRouter.js');
const Cliente = require('./routes/ClienteRouter.js');
const ContaUtilizadores = require('./routes/ContaUtilizadorRouter.js');
const servico = require('./routes/ServicoRouter.js');
const EquipaHasServico = require('./routes/EquipaHasServicoRouter.js');
const Contrato = require('./routes/ContratoRouter.js')
const ContratoHasServico = require('./routes/ContratoHasServicoRouter.js');
const AgendaServico = require('./routes/AgendaServicoRouter.js');
const Visita = require('./routes/VisitaRouter.js');
const NotaVisita = require('./routes/NotaVisitaRouter.js');
const HistoricoVisita = require('./routes/HistoricoVisitaRouter.js');
const ServicoHasTarefa = require('./routes/ServicoHasTarefaRouter.js');
const ResponsavelDepartamentoRouter = require('./routes/ResponsavelDepartamentoRouter.js');
const ChefeEquipaRouter = require('./routes/ChefeEquipaRouter.js');
const TarefaServicoVisita = require('./routes/TarefaServicoVisitaRouter.js');
const AnomaliasVisita = require('./routes/AnomaliaVisitaRouter.js');


var cors = require('cors');
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());


app.use('/user', UserRouter);
app.use('/login', LoginRouter);
app.use('/tiposervico', TipoServico);
app.use('/planosubscricao',PlanoSubscricao );
app.use('/planosubscricaoempresa',PlanoSubscricaoEmpresaRouter );
app.use('/empresa',Empresa );
app.use('/departamento',Departamento );
app.use('/equipa',Equipa );
app.use('/funcionario',Funcionarios );
app.use('/cliente',Cliente );
app.use('/contautilizador',ContaUtilizadores );
app.use('/servico',servico );
app.use('/equipahasservico',EquipaHasServico );
app.use('/contrato',Contrato );
app.use('/contratohasservico',ContratoHasServico );
app.use('/agendaservico',AgendaServico );
app.use('/visita',Visita );
app.use('/notavisita',NotaVisita );
app.use('/historicovisita',HistoricoVisita );
app.use('/servicohastarefa',ServicoHasTarefa );
app.use('/responsaveldepartamento',ResponsavelDepartamentoRouter );
app.use('/chefeequipa',ChefeEquipaRouter );
app.use('/tarefaservicovisita',TarefaServicoVisita );
app.use('/anomaliavisita',AnomaliasVisita );


app.get('/me', Verificar.verificarToken, async (req, res) => {
  console.log(req.userId)
  const user = await ContaUtilizador.findByPk(req.userId, {
    attributes: {
      exclude: ['password']
    },
    include: { model: Funcionario, attributes: ['nome_completo', 'email', 'funcionario_id', 'empresa_id','equipa_id'] }
  })

  if (!user) {
    return res.json({ Error: "Utilizador não encontrado" })
  }

  return res.json({ Status: "Success", user: user })
});


app.get('/help/check', (req, res) => {
  res.status(200).send({message: "Wecolme to GDVC API"});
});

sequelize.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

// Specify the URL where the server will be running
const PORT = process.env.PORT || '10000';

// Start the server
app.listen(PORT, hostname: () => {
  console.log(`Server is running at ${PORT}`);
});
