const AgendaServico = require('../models/agendaServicos');
const Equipas = require('../models/equipas');
const Funcionarios = require('../models/funcionarios');
const Visita = require('../models/visitas');
const Contrato = require('../models/contratos');
const ContratosHasServicos = require('../models/contratosHasServicos');
const Servicos = require('../models/servicos');
const TarefasServicosVisita = require('../models/tarefasServicosVisita');
const Cliente = require('../models/clientes');
const { format } = require('date-fns');

const getAgendaServicos = async (req, res) => {
    try {
        const agendaServicos = await AgendaServico.findAll();
        return res.json({ Status: "Success", agendaServicos: agendaServicos });
    } catch (error) {
        return res.json({ Error: error });
    }
}

// const getAgendaServicoById = async (req, res) => {
//     try {
//         const agendaServico = await AgendaServico.findByPk(req.params.id);
//         if (!agendaServico) {
//             return res.json({ Error: "AgendaServico não encontrado" });
//         }
//         return res.json({ Status: "Success", agendaServico: agendaServico });
//     } catch (error) {
//         return res.json({ Error: error });
//     }
// }
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
                attributes: ['visita_id', 'contrato_id', 'data_visita', 'hora_visita_inicio', 'hora_visita_fim', 'inicio_visita', 'fim_visita'],
                where: {
                    agenda_servico_id: id
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
        const agendaServico = await AgendaServico.create(req.body);
        return res.json({ Status: "Success", agendaServico: agendaServico });
    } catch (error) {
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

module.exports = {
    getAgendaServicos,
    getAgendaServicoById,
    createAgendaServico,
    updateAgendaServico,
    deleteAgendaServico
};
