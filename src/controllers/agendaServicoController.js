import AgendaServico from '../models/agendaServicos.js';
import Visita from '../models/visitas.js';
import Contrato from '../models/contratos.js';
import ContratosHasServicos from '../models/contratosHasServicos.js';
import Servicos from '../models/servicos.js';
import TarefasServicosVisita from '../models/tarefasServicosVisita.js';
import Cliente from '../models/clientes.js';
import NotaVisita from '../models/notasVisitas.js';
import { format } from 'date-fns';
import ContaUtilizador from '../models/contaUtilizadores.js';
import Funcionarios from '../models/funcionarios.js';
import ServicosHasTarefas from '../models/servicosHasTarefas.js';
import { setupSocket, io, sendPushNotification } from '../config/socket.js';


const getAgendaServicos = async (req, res) => {
    try {
        const agendaServicos = await AgendaServico.findAll();
        return res.json({ Status: "Success", agendaServicos: agendaServicos });
    } catch (error) {
        return res.json({ Error: error });
    }
}



const getByAgendasId = async (req, res) => {
    console.log(req.body); // Deveria imprimir o array de números
    try {
        const agendaServicosIds = req.body.id; // Altere para corresponder à chave correta no objeto req.body

        if (!agendaServicosIds || !Array.isArray(agendaServicosIds)) {
            return res.json({ Error: "Array de IDs de agendaServicos inválido" });
        }

        const agendaServicos = await AgendaServico.findAll({
            where: {
                agenda_servico_id: agendaServicosIds
            }
        });

        console.log(agendaServicos);

        if (!agendaServicos || agendaServicos.length === 0) {
            return res.json({ Error: "AgendaServicos não encontrados" });
        }

        return res.json({ Status: "Success", agendaServicos: agendaServicos });

    } catch (error) {
        console.log(error);
        return res.json({ Error: error });
    }
}

const getClientAgendas = async (req, res) => {
    try {
        const contratosCliente = await Contrato.findAll({
            where: {
                cliente_id: req.body.id
            }
        });

        if (!contratosCliente || contratosCliente.length === 0) {
            return res.json({ Error: "Contratos não encontrados" });
        }

        const contratosIds = contratosCliente.map(contrato => contrato.contrato_id);

        const getVisitas = await Visita.findAll({
            where: {
                contrato_id: contratosIds,
                estado_servico: "terminada"
            },
            order: [
                ['agenda_servico_id', 'ASC']
            ],
            attributes: ['agenda_servico_id', 'data_visita', 'inicio_visita', 'fim_visita', 'contrato_id', 'estado_servico']
        });

        if (!getVisitas || getVisitas.length === 0) {
            return res.json({ Error: "Visitas não encontradas" });
        }

        const contratosHasServicos = await ContratosHasServicos.findAll({
            where: {
                contrato_id: contratosIds
            },
            include: {
                model: Servicos,
                attributes: ['nome']
            }
        });

        // Mapeie o resultado para formatar as visitas incluindo o nome do serviço
        const visitasFormatadas = getVisitas.map(visita => {
            const contratoServico = contratosHasServicos.find(item => item.contrato_id === visita.contrato_id);
            const servicoNome = contratoServico ? contratoServico.servico.nome : 'Serviço não encontrado';
            return {
                agenda_servico_id: visita.agenda_servico_id,
                data_visita: visita.data_visita,
                inicio_visita: visita.inicio_visita,
                fim_visita: visita.fim_visita,
                estado_servico: visita.estado_servico,
                contrato_id: visita.contrato_id,
                servico_nome: servicoNome,

            };
        });

        return res.json({ Status: "Success", visitas: visitasFormatadas });
    } catch (error) {
        return res.json({ Error: error });
    }
}




const getAgendaServicoById = async (req, res) => {
    const id = req.body.id;
    try {
        const agendaServico = await AgendaServico.findByPk(id);

        if (!agendaServico) {
            return res.json({ Error: "AgendaServico não encontrado" });
        }

        const funcionarios = await Funcionarios.findAll({
            attributes: ['nome_completo', 'cargo'],
            where: {
                equipa_id: agendaServico.equipa_id
            }
        });

        if (!funcionarios) {
            return res.json({ Error: "Funcionarios não encontrados" });
        }

        agendaServico.dataValues.funcionarios = funcionarios;

        const visita = await Visita.findOne(
            {
                attributes: ['visita_id', 'contrato_id', 'data_visita', 'hora_visita_inicio', 'hora_visita_fim', 'inicio_visita', 'fim_visita', 'iniciado_por_id'],
                where: {
                    agenda_servico_id: id
                },
                include: {
                    model: ContaUtilizador,
                    exclude: ['password'],
                    include: {
                        model: Funcionarios,
                        attributes: ['nome_completo']
                    }
                }
            }
        );

        if (!visita) {
            return res.json({ Error: "Visita não encontrada" });
        }

        const inicio_visita_date = new Date(visita.inicio_visita);
        const inicio_visita_string = format(inicio_visita_date, "yyyy-MM-dd HH:mm:ss");

        // Dividindo o valor de inicio_visita_string em inicio_visita_data e inicio_visita_hora
        const [inicio_visita_data, inicio_visita_hora] = inicio_visita_string.split(' ');

        // Adicionando as propriedades ao objeto de visita
        visita.dataValues.inicio_visita_data = inicio_visita_data;
        visita.dataValues.inicio_visita_hora = inicio_visita_hora;

        agendaServico.dataValues.visita = visita;


        const contrato = await Contrato.findOne(
            {
                where: {
                    contrato_id: visita.contrato_id
                },
                attributes: ['contrato_id', 'cliente_id', 'morada_servico', 'cod_postal_servico', 'localidade_servico']
            }
        );

        if (!contrato) {
            return res.json({ Error: "Contrato não encontrado" });
        }

        // Criando objeto de morada do serviço
        const endereco = {
            morada: `${contrato.morada_servico}, ${contrato.cod_postal_servico} ${contrato.localidade_servico}`
        };


        const contratohasservice = await ContratosHasServicos.findOne(
            {
                where: {
                    contrato_id: contrato.contrato_id
                }
            }
        )

        if (!contratohasservice) {
            return res.json({ Error: "Contrato não encontrado" });
        }

        const ServiceName = await Servicos.findByPk(contratohasservice.servico_id, {
            attributes: ['nome', 'descricao']
        });


        if (!ServiceName) {
            return res.json({ Error: "Contrato não encontrado" });
        }

        agendaServico.dataValues.servico = ServiceName;

        const cliente = await Cliente.findOne(
            {
                where: {
                    cliente_id: contrato.cliente_id
                },
                attributes: ['nome_completo', 'email', 'contacto', 'contacto', 'cod_postal', 'localidade']
            }
        )

        if (!cliente) {
            return res.json({ Error: "Cliente não encontrado" });
        }

        agendaServico.dataValues.cliente = cliente;

        const tarefas = await TarefasServicosVisita.findAll(
            {
                where: {
                    visita_id: visita.visita_id
                },
                order: [
                    ['tarefa_servico_visita_id', 'ASC']
                ]

            }
        )

        if (!tarefas) {
            return res.json({ Error: "Tarefas não encontradas" });
        }

        agendaServico.dataValues.tarefas = tarefas;

        // Adicionando o objeto de morada do serviço à resposta
        agendaServico.dataValues.endereco = endereco;

        return res.json({ Status: "Success", agendaServico: agendaServico });
    } catch (error) {
        console.log(error);
        return res.json({ Error: error });
    }
}


const createAgendaServico = async (req, res) => {
    try {

        let novasVisitas = [];
        let agendaServico;// Initialize the agendaServico variable with an empty object

        if (req.body.data_visita == req.body.data_visita_fim) {
            agendaServico = await AgendaServico.create(req.body);
            const novavisita = await Visita.create(
                {
                    data_visita: req.body.data_visita,
                    hora_visita_inicio: req.body.hora_visita_inicio,
                    hora_visita_fim: req.body.hora_visita_fim,
                    // inicio_visita: "09:00:00",
                    // fim_visita: "09:00:00",
                    agenda_servico_id: agendaServico.agenda_servico_id,
                    contrato_id: req.body.contrato_id,
                    estado_servico: "agendada",
                }
            )
            novasVisitas.push(novavisita);
        }
        else {
            const dataInicio = new Date(req.body.data_visita);
            const dataFim = new Date(req.body.data_visita_fim);
            const horaInicio = req.body.hora_visita_inicio;
            const horaFim = req.body.hora_visita_fim;

            for (let data = dataInicio; data <= dataFim; data.setDate(data.getDate() + 1)) {
                agendaServico = await AgendaServico.create(req.body); // Cria uma nova agenda de serviço para cada data
                const novaVisita = await Visita.create({
                    data_visita: data,
                    hora_visita_inicio: horaInicio,
                    hora_visita_fim: horaFim,
                    agenda_servico_id: agendaServico.agenda_servico_id,
                    contrato_id: req.body.contrato_id,
                    estado_servico: "agendada",
                });
                novasVisitas.push(novaVisita);
            }

        }

        if (!novasVisitas.length) {
            return res.json({ Error: "Nenhuma visita criada" });
        }


        // Criação de notas para cada visita
        for (const visita of novasVisitas) {
            if (req.body.nota) {
                await NotaVisita.create({
                    visita_id: visita.visita_id,
                    nota: req.body.nota,
                    criado_por_id: req.body.criado_por_id
                });
            }
        }

        const servico = await ContratosHasServicos.findOne({
            where: {
                contrato_id: req.body.contrato_id
            }
        });


        if (!servico) {
            return res.json({ Error: "Serviço não encontrado" });
        }

        // console.log("Servico id", servico.servico_id)

        // Criação de notas para cada visita
        for (const visita of novasVisitas) {
            // Criação de tarefas para cada visita
            const tarefas = await ServicosHasTarefas.findAll({
                where: {
                    servico_id: servico.servico_id
                }
            });

            if (!tarefas) {
                return res.json({ Error: "Tarefas não encontradas" });
            }

            for (let i = 0; i < tarefas.length; i++) {
                const tarefa = tarefas[i];
                await TarefasServicosVisita.create({
                    visita_id: visita.visita_id,
                    tarefa: tarefa.tarefa,
                    estado: "em andamento",
                    tempo_estimado: tarefa.tempo_estimado,
                    tipo_tempo_estimado: tarefa.tipo_tempo_estimado
                });
            }
        }

        let teste;

        if (req.body.ativo === 0) {
            console.log('Emitindo evento nova-visita-para-aprovar');

            teste = io.emit('nova-visita-para-aprovar', req.body.departamento);
            console.log("teste", teste);
            sendPushNotification(req.body.departamento, 'Nova visita para aprovar')
        }


        return res.json({ Status: "Success", Teste: teste, agendaServico: agendaServico, visitas: novasVisitas });
    } catch (error) {
        console.log(error);
        return res.json({ Error: error });
    }
}

const updateAgendaServico = async (req, res) => {
    try {
        const agendaServico = await AgendaServico.findByPk(req.params.id);
        if (!agendaServico) {
            return res.json({ Error: "AgendaServico não encontrado" });
        }
        await agendaServico.update(req.body);
        return res.json({ Status: "Success", agendaServico: agendaServico });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const deleteAgendaServico = async (req, res) => {
    try {
        const agendaServico = await AgendaServico.findByPk(req.params.id);
        if (!agendaServico) {
            return res.json({ Error: "AgendaServico não encontrado" });
        }
        await agendaServico.destroy();
        return res.json({ Status: "Success", agendaServico: agendaServico });
    } catch (error) {
        return res.json({ Error: error });
    }
}


const getByEquipas = async (req, res) => {
    try {
        const agendaServicos = await AgendaServico.findAll({
            where: {
                empresa_id: req.body.id
            }
        });

        if (!agendaServicos || agendaServicos.length === 0) {
            return res.json({ Error: "AgendaServicos não encontrados" });
        }

        const agendaServicoIds = agendaServicos.map(agenda => agenda.agenda_servico_id);

        const visitas = await Visita.findAll({
            where: {
                agenda_servico_id: agendaServicoIds
            }
        });

        if (!visitas || visitas.length === 0) {
            return res.json({ Error: "Visitas não encontradas" });
        }

        const result = agendaServicos.map(agenda => {
            const agendaVisitas = visitas.filter(visita => visita.agenda_servico_id === agenda.agenda_servico_id);
            if (agendaVisitas.length > 0) {
                return agendaVisitas.map(visita => ({
                    equipa_id: agenda.equipa_id,
                    data_visita: visita.data_visita,
                    hora_visita_inicio: visita.hora_visita_inicio,
                    hora_visita_fim: visita.hora_visita_fim
                }));
            }
            return null;
        }).filter(Boolean);

        // console.log(result.flat());

        return res.json({ Status: "Success", agendaServicos: result.flat() });
    } catch (error) {
        return res.json({ Error: error });
    }
}




export {
    getAgendaServicos,
    getAgendaServicoById,
    createAgendaServico,
    updateAgendaServico,
    deleteAgendaServico,
    getByEquipas,
    getClientAgendas,
    getByAgendasId
};