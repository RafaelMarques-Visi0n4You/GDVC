import { sendEmail, sendEmailNextVisit } from '../config/nodemailer.js';
import Visita from '../models/visitas.js';
import Servicos from '../models/servicos.js';
import Contratos from '../models/contratos.js';
import ContratosHasServicos from '../models/contratosHasServicos.js';
import AgendaServico from '../models/agendaServicos.js';
import Equipas from '../models/equipas.js';
import Cliente from '../models/clientes.js';
import ContaUtilizador from '../models/contaUtilizadores.js';
import Funcionarios from '../models/funcionarios.js';
import TarefasServicosVisita from '../models/tarefasServicosVisita.js';
import AnomaliasVisita from '../models/anomaliasVisita.js';
import ResponsavelDepartamento from '../models/responsavelDepartamento.js';
import NotasVisitas from '../models/notasVisitas.js';


//4 tipos de perfil [nível 1 - Funcionário, nível 2 - Chef da equipa, nível 3 – Supervisor, nível 4 - Diretor (admin) ]
//o diretor recebe todas as visitas da sua empresa
//o supervisor recebe as visitas 
//o chef de equipa recebe as visitas da sua equipa
//o Funcionario recebe as visitas que lhe estão atribuídas atraves da sua equipa

const getVisitas = async (req, res) => {
    const empresaID = req.body.empresa_id;
    //const perfilID = req.body.funcionario_id;
    const equipaID = req.body.equipa_id;
    try {
        const visitas = await Visita.findAll({

            include: [
                {
                    model: Contratos,
                    attributes: ['contrato_id', 'nome', 'morada_servico', 'cod_postal_servico', 'localidade_servico'],
                },
                {
                    model: AgendaServico,
                    attributes: ['empresa_id'],
                    where: { equipa_id: equipaID }
                },

            ]
        });

        // Array para armazenar as visitas com informações de serviço
        const visitasComServicos = [];

        // Iterar sobre cada visita
        for (const visita of visitas) {
            const contratoID = visita.contrato_id;
            const contrato = await Contratos.findByPk(contratoID);

            if (contrato) {
                // Criando o campo 'endereco' a partir dos campos de morada, código postal e localidade do contrato
                visita.dataValues.endereco = `${contrato.morada_servico}, ${contrato.cod_postal_servico} ${contrato.localidade_servico}`;
            } else {
                visita.dataValues.endereco = "Endereço não especificado";
            }

            // Consultar a tabela contratos_has_servicos para obter o id de cadas servico associado a este contrato
            const servicos = await ContratosHasServicos.findAll({
                where: {
                    contrato_id: contratoID
                }
            });

            // Array para armazenar os detalhes dos serviços
            const detalhesServicos = [];

            // Iterar sobre cada serviço e obter o nome e o ID do serviço na tabela Servicos
            for (const servico of servicos) {
                const servicoID = servico.servico_id;
                const servicoInfo = await Servicos.findByPk(servicoID);
                if (servicoInfo) {
                    // Inclua o nome e o ID do serviço nos detalhes
                    detalhesServicos.push({
                        servico_id: servicoID,
                        nome: servicoInfo.nome
                    });
                }
            }

            // Inclui os detalhes dos serviços na visita atual
            visita.dataValues.servicos = detalhesServicos;
            visitasComServicos.push(visita);
        }

        return res.json({ Status: "Success", visitas: visitasComServicos });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getNivel3Visitas = async (req, res) => {
    const empresaID = req.body.empresa_id;
    const departamentoID = req.body.departamento_id;
    try {
        const visitas = await Visita.findAll({
            order: [
                ['data_visita', 'ASC'],
                ['hora_visita_inicio', 'ASC']
            ],
            include: [
                {
                    model: Contratos,
                    attributes: ['contrato_id', 'nome', 'morada_servico', 'cod_postal_servico', 'localidade_servico'],
                    include: [
                        {
                            model: Cliente,
                            attributes: ['cliente_id', 'nome_completo'],
                        }
                    ]
                },
                {
                    model: AgendaServico,
                    attributes: ['empresa_id'],
                    where: { empresa_id: empresaID, ativo: 1 },
                    include: [
                        {
                            model: Equipas,
                            attributes: ['equipa_id', 'cor_equipa', 'nome'],
                            where: { departamento_id: departamentoID, ativo: 1 }
                        }
                    ]
                },

            ]
        });

        const visitasComServicos = [];

        // Iterar sobre cada visita
        for (const visita of visitas) {
            const contratoID = visita.contrato_id;
            const contrato = await Contratos.findByPk(contratoID);

            if (contrato) {
                // Criando o campo 'endereco' a partir dos campos de morada, código postal e localidade do contrato
                visita.dataValues.endereco = `${contrato.morada_servico}, ${contrato.cod_postal_servico} ${contrato.localidade_servico}`;
            } else {
                visita.dataValues.endereco = "Endereço não especificado";
            }

            // Consultar a tabela contratos_has_servicos para obter o id de cadas servico associado a este contrato
            const servicos = await ContratosHasServicos.findAll({
                where: {
                    contrato_id: contratoID
                }
            });

            // Array para armazenar os detalhes dos serviços
            const detalhesServicos = [];

            // Iterar sobre cada serviço e obter o nome e o ID do serviço na tabela Servicos
            for (const servico of servicos) {
                const servicoID = servico.servico_id;
                const servicoInfo = await Servicos.findByPk(servicoID);
                if (servicoInfo) {
                    // Inclua o nome e o ID do serviço nos detalhes
                    detalhesServicos.push({
                        servico_id: servicoID,
                        nome: servicoInfo.nome
                    });
                }
            }

            // Inclui os detalhes dos serviços na visita atual
            visita.dataValues.servicos = detalhesServicos;
            visitasComServicos.push(visita);
        }

        return res.json({ Status: "Success", visitas: visitasComServicos });
    } catch (error) {
        console.log(error);
        return res.json({ Error: error });
    }
}

const getVisitasPendentes = async (req, res) => {
    const empresaID = req.body.empresa_id;
    const departamentoID = req.body.departamento_id;
    try {
        const visitas = await Visita.findAll({
            order: [
                ['data_visita', 'ASC'],
                ['hora_visita_inicio', 'ASC']
            ],
            include: [
                {
                    model: Contratos,
                    attributes: ['contrato_id', 'nome', 'morada_servico', 'cod_postal_servico', 'localidade_servico'],
                },
                {
                    model: AgendaServico,
                    attributes: ['empresa_id'],
                    where: { empresa_id: empresaID, ativo: 0 },
                    include: [
                        {
                            model: Equipas,
                            attributes: ['equipa_id', 'cor_equipa', 'nome'],
                            where: { departamento_id: departamentoID, ativo: 1 }
                        }
                    ]
                },

            ]
        });

        const visitasComServicos = [];

        // Iterar sobre cada visita
        for (const visita of visitas) {
            const contratoID = visita.contrato_id;
            const contrato = await Contratos.findByPk(contratoID);

            if (contrato) {
                // Criando o campo 'endereco' a partir dos campos de morada, código postal e localidade do contrato
                visita.dataValues.endereco = `${contrato.morada_servico}, ${contrato.cod_postal_servico} ${contrato.localidade_servico}`;
            } else {
                visita.dataValues.endereco = "Endereço não especificado";
            }

            // Consultar a tabela contratos_has_servicos para obter o id de cadas servico associado a este contrato
            const servicos = await ContratosHasServicos.findAll({
                where: {
                    contrato_id: contratoID
                }
            });

            // Array para armazenar os detalhes dos serviços
            const detalhesServicos = [];

            // Iterar sobre cada serviço e obter o nome e o ID do serviço na tabela Servicos
            for (const servico of servicos) {
                const servicoID = servico.servico_id;
                const servicoInfo = await Servicos.findByPk(servicoID);
                if (servicoInfo) {
                    // Inclua o nome e o ID do serviço nos detalhes
                    detalhesServicos.push({
                        servico_id: servicoID,
                        nome: servicoInfo.nome
                    });
                }
            }

            // Inclui os detalhes dos serviços na visita atual
            visita.dataValues.servicos = detalhesServicos;
            visitasComServicos.push(visita);
        }

        return res.json({ Status: "Success", visitas: visitasComServicos });
    } catch (error) {
        console.log(error);
        return res.json({ Error: error });
    }
}


const getVisitasPendentesNivel4 = async (req, res) => {
    const empresaID = req.body.empresa_id;
    
    try {
        const visitas = await Visita.findAll({
            order: [
                ['data_visita', 'ASC'],
                ['hora_visita_inicio', 'ASC']
            ],
            include: [
                {
                    model: Contratos,
                    attributes: ['contrato_id', 'nome', 'morada_servico', 'cod_postal_servico', 'localidade_servico'],
                },
                {
                    model: AgendaServico,
                    attributes: ['empresa_id'],
                    where: { empresa_id: empresaID, ativo: 0 },
                    include: [
                        {
                            model: Equipas,
                            attributes: ['equipa_id', 'cor_equipa', 'nome'],
                            where: { ativo: 1 }
                        }
                    ]
                },

            ]
        });

        const visitasComServicos = [];

        // Iterar sobre cada visita
        for (const visita of visitas) {
            const contratoID = visita.contrato_id;
            const contrato = await Contratos.findByPk(contratoID);

            if (contrato) {
                // Criando o campo 'endereco' a partir dos campos de morada, código postal e localidade do contrato
                visita.dataValues.endereco = `${contrato.morada_servico}, ${contrato.cod_postal_servico} ${contrato.localidade_servico}`;
            } else {
                visita.dataValues.endereco = "Endereço não especificado";
            }

            // Consultar a tabela contratos_has_servicos para obter o id de cadas servico associado a este contrato
            const servicos = await ContratosHasServicos.findAll({
                where: {
                    contrato_id: contratoID
                }
            });

            // Array para armazenar os detalhes dos serviços
            const detalhesServicos = [];

            // Iterar sobre cada serviço e obter o nome e o ID do serviço na tabela Servicos
            for (const servico of servicos) {
                const servicoID = servico.servico_id;
                const servicoInfo = await Servicos.findByPk(servicoID);
                if (servicoInfo) {
                    // Inclua o nome e o ID do serviço nos detalhes
                    detalhesServicos.push({
                        servico_id: servicoID,
                        nome: servicoInfo.nome
                    });
                }
            }

            // Inclui os detalhes dos serviços na visita atual
            visita.dataValues.servicos = detalhesServicos;
            visitasComServicos.push(visita);
        }

        return res.json({ Status: "Success", visitas: visitasComServicos });
    } catch (error) {
        console.log(error);
        return res.json({ Error: error });
    }
}

const getNivel1Visitas = async (req, res) => {
    const equipaID = req.body.equipa_id;
    try {
        const visitas = await Visita.findAll({
            order: [
                ['data_visita', 'ASC'],
                ['hora_visita_inicio', 'ASC']
            ],
            include: [

                {
                    model: Contratos,
                    attributes: ['contrato_id', 'nome', 'morada_servico', 'cod_postal_servico', 'localidade_servico'],
                    include: [
                        {
                            model: Cliente,
                            attributes: ['cliente_id', 'nome_completo'],
                        }
                    ]
                },
                {
                    model: AgendaServico,
                    attributes: ['empresa_id'],
                    where: { equipa_id: equipaID, ativo: 1 },
                    include: [
                        {
                            model: Equipas,
                            attributes: ['equipa_id', 'cor_equipa', 'nome'],
                        }
                    ]
                },

            ]
        });


        // Array para armazenar as visitas com informações de serviço
        const visitasComServicos = [];

        // Iterar sobre cada visita
        for (const visita of visitas) {
            const contratoID = visita.contrato_id;
            const contrato = await Contratos.findByPk(contratoID);

            if (contrato) {
                // Criando o campo 'endereco' a partir dos campos de morada, código postal e localidade do contrato
                visita.dataValues.endereco = `${contrato.morada_servico}, ${contrato.cod_postal_servico} ${contrato.localidade_servico}`;
            } else {
                visita.dataValues.endereco = "Endereço não especificado";
            }

            // Consultar a tabela contratos_has_servicos para obter o id de cadas servico associado a este contrato
            const servicos = await ContratosHasServicos.findAll({
                where: {
                    contrato_id: contratoID
                }
            });

            // Array para armazenar os detalhes dos serviços
            const detalhesServicos = [];

            // Iterar sobre cada serviço e obter o nome e o ID do serviço na tabela Servicos
            for (const servico of servicos) {
                const servicoID = servico.servico_id;
                const servicoInfo = await Servicos.findByPk(servicoID);
                if (servicoInfo) {
                    // Inclua o nome e o ID do serviço nos detalhes
                    detalhesServicos.push({
                        servico_id: servicoID,
                        nome: servicoInfo.nome
                    });
                }
            }

            // Inclui os detalhes dos serviços na visita atual
            visita.dataValues.servicos = detalhesServicos;
            visitasComServicos.push(visita);
        }

        return res.json({ Status: "Success", visitas: visitasComServicos });
    } catch (error) {
        console.log(error);
        return res.json({ Error: error });
    }
}


const getEmpresaVisitas = async (req, res) => {
    const empresaID = req.body.empresa_id;
    try {
        const visitas = await Visita.findAll({
            order: [
                ['data_visita', 'DESC'],
                ['hora_visita_inicio', 'ASC']
            ],
            include: [

                {
                    model: Contratos,
                    attributes: ['contrato_id', 'nome', 'morada_servico', 'cod_postal_servico', 'localidade_servico'],
                    include: [
                        {
                            model: Cliente,
                            attributes: ['cliente_id', 'nome_completo'],
                        }
                    ]
                },
                {
                    model: AgendaServico,
                    attributes: ['empresa_id'],
                    where: {
                        empresa_id: empresaID,
                        ativo: 1
                    },
                    include: [
                        {
                            model: Equipas,
                            attributes: ['equipa_id', 'cor_equipa', 'nome'],
                        }
                    ]
                },

            ]
        });


        // Array para armazenar as visitas com informações de serviço
        const visitasComServicos = [];

        // Iterar sobre cada visita
        for (const visita of visitas) {
            const contratoID = visita.contrato_id;
            const contrato = await Contratos.findByPk(contratoID);

            if (contrato) {
                // Criando o campo 'endereco' a partir dos campos de morada, código postal e localidade do contrato
                visita.dataValues.endereco = `${contrato.morada_servico}, ${contrato.cod_postal_servico} ${contrato.localidade_servico}`;
            } else {
                visita.dataValues.endereco = "Endereço não especificado";
            }

            // Consultar a tabela contratos_has_servicos para obter o id de cadas servico associado a este contrato
            const servicos = await ContratosHasServicos.findAll({
                where: {
                    contrato_id: contratoID
                }
            });

            // Array para armazenar os detalhes dos serviços
            const detalhesServicos = [];

            // Iterar sobre cada serviço e obter o nome e o ID do serviço na tabela Servicos
            for (const servico of servicos) {
                const servicoID = servico.servico_id;
                const servicoInfo = await Servicos.findByPk(servicoID);
                if (servicoInfo) {
                    // Inclua o nome e o ID do serviço nos detalhes
                    detalhesServicos.push({
                        servico_id: servicoID,
                        nome: servicoInfo.nome
                    });
                }
            }

            // Inclui os detalhes dos serviços na visita atual
            visita.dataValues.servicos = detalhesServicos;
            visitasComServicos.push(visita);
        }

        return res.json({ Status: "Success", visitas: visitasComServicos });
    } catch (error) {
        console.log(error);
        return res.json({ Error: error });
    }
}

const getContactDetails = async (req, res) => {
    try {
        const visitas = await Visita.findByPk(req.body.id);

        if (!visitas) {
            return res.json({ Error: "Visita não encontrada" });
        }

        const details = await Contratos.findByPk(visitas.contrato_id);

        if (!details) {
            return res.json({ Error: "Detalhes do contrato não encontrados" });
        }

        const client = await Cliente.findByPk(details.cliente_id);

        if (!client) {
            return res.json({ Error: "Cliente não encontrado" });
        }

        return res.json({ Status: "Success", contrato: details, cliente: client });
    } catch (error) {
        return res.json({ Error: error });
    }
}


const getAllVisitas = async (req, res) => {
    try {
        const visitas = await Visita.findAll();
        return res.json({ Status: "Success", visitas: visitas });
    } catch (error) {
        return res.json({ Error: error });
    }
}



const getVisitaById = async (req, res) => {
    try {
        const visita = await Visita.findByPk(req.params.id);
        if (!visita) {
            return res.json({ Error: "Visita não encontrada" });
        }
        return res.json({ Status: "Success", visita: visita });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const createVisita = async (req, res) => {
    try {
        const visita = await Visita.create(req.body);
        return res.json({ Status: "Success", visita: visita });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const updateVisita = async (req, res) => {
    try {
        const visita = await Visita.findByPk(req.params.id);
        if (!visita) {
            return res.json({ Error: "Visita não encontrada" });
        }
        await visita.update(req.body);
        return res.json({ Status: "Success", visita: visita });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const updateEstado = async (req, res) => {
    try {
        const visita = await Visita.findByPk(req.params.id);
        if (!visita) {
            return res.json({ Error: "Visita não encontrada" });
        }
        await visita.update(
            {
                estado_servico: req.body.estado,
            }
        );
        return res.json({ Status: "Success", visita: visita });
    } catch (error) {
        return res.json({ Error: error });
    }
}


const deleteVisita = async (req, res) => {
    try {
        const visita = await Visita.findByPk(req.params.id);
        if (!visita) {
            return res.json({ Error: "Visita não encontrada" });
        }
        const agendaId = visita.agenda_servico_id;

        const tarefas = await TarefasServicosVisita.findAll({ where: { visita_id: visita.visita_id } });
        for (const tarefa of tarefas) {
            await tarefa.destroy();
        }

        const notas = await NotasVisitas.findAll({ where: { visita_id: visita.visita_id } });
        for (const nota of notas) {
            await nota.destroy();
        }

        const anomalia = await AnomaliasVisita.findAll({ where: { visita_id: visita.visita_id } });
        for (const anom of anomalia) {
            await anom.destroy();
        }

        await visita.destroy();

        const agenda = await AgendaServico.findByPk(agendaId);

        if (!agenda) {
            return res.json({ Error: "Agenda não encontrada" });
        }

        await agenda.destroy();


        return res.json({ Status: "Success", visita: visita });
    } catch (error) {
        console.log(error);
        return res.json({ Error: error });
    }
}

//mudar o estado 


const sendEmailWithNextVisit = async (req, res) => {
    const id = req.body.id;
    const data = req.body.data;
    const text = req.body.text;

    // console.log("Data:", data);
    try {
        const visita = await Visita.findByPk(id);

        if (!visita) {
            return res.json({ Error: "Visita não encontrada" });
        }

        const visit = await Visita.findByPk(req.body.id);
        const user = await ContaUtilizador.findByPk(visit.iniciado_por_id, {
            attributes: { exclude: ['password'] },
        }
        );
        const funcionario = await Funcionarios.findByPk(user.funcionario_id, { attributes: ['nome_completo', 'email', 'departamento_id', 'equipa_id'] });
        const contrato = await Contratos.findByPk(visit.contrato_id);
        const servicoid = await ContratosHasServicos.findOne({ where: { contrato_id: contrato.contrato_id } });
        const servico = await Servicos.findByPk(servicoid.servico_id);
        const tarefasConcluidas = await TarefasServicosVisita.findAll({ where: { visita_id: visit.visita_id, estado: 'concluido' } });
        const tarefasNaoConcluidas = await TarefasServicosVisita.findAll({ where: { visita_id: visit.visita_id, estado: 'em andamento' } });
        const anomalias = await AnomaliasVisita.findAll({ where: { visita_id: visit.visita_id } });
        const cliente = await Cliente.findByPk(contrato.cliente_id);
        const responsavelDepartamento = await ResponsavelDepartamento.findOne({ where: { departamento_id: funcionario.departamento_id } });
        const supervisor = await Funcionarios.findByPk(responsavelDepartamento.funcionario_id);
        const emailSupervisor = await ContaUtilizador.findOne({ where: { funcionario_id: supervisor.funcionario_id }, attributes: ['email'] });
        const equipa = await Funcionarios.findAll({ where: { equipa_id: funcionario.equipa_id } });
        const nomeEquipa = await Equipas.findByPk(funcionario.equipa_id, { attributes: ['nome'] });

        const dataToSend = [
            user.dataValues,
            emailSupervisor.dataValues.email,
            visit.dataValues,
            funcionario.dataValues,
            contrato.dataValues,
            servico.dataValues,
            cliente.dataValues,
            tarefasConcluidas.map(tarefa => tarefa.dataValues),
            tarefasNaoConcluidas.map(tarefa => tarefa.dataValues),
            anomalias.map(anomalia => anomalia.dataValues),
            equipa.map(equipa => equipa.dataValues),
            nomeEquipa.dataValues,
            data,
            text
        ];

        // Enviar o array para a função sendEmail
        sendEmailNextVisit(dataToSend);
    }
    catch (error) {
        console.log(error);
        return res.json({ Error: error });
    }
}

const acceptVisit = async (req, res) => {
    const id = req.body.id;
    try {

        const visita = await Visita.findByPk(id);

        if (!visita) {
            return res.json({ Error: "Visita não encontrada" });
        }

        const agenda = await AgendaServico.update({ ativo: 1 }, { where: { agenda_servico_id: visita.agenda_servico_id } });

        if (!agenda) {
            return res.json({ Error: "Agenda não encontrada" });
        }

        console.log("Agenda:", agenda);
        return res.json({ Status: "Success", agenda: agenda });


    } catch (error) {
        console.log(error);
        return res.json({ Error: error });
    }
}

const cancelarvisita = async (req, res) => {
    const id = req.body.id;
    try {

        const visita = await Visita.findByPk(id);

        if (!visita) {
            return res.json({ Error: "Visita não encontrada" });
        }

        const agenda = await AgendaServico.update({ ativo: 1 }, { where: { agenda_servico_id: visita.agenda_servico_id } });

        const estado = await Visita.update({ estado_servico: 'cancelada' }, { where: { visita_id: id } });

        if (!agenda) {
            return res.json({ Error: "Agenda não encontrada" });
        }

        console.log("Agenda:", agenda);
        return res.json({ Status: "Success", agenda: agenda });


    } catch (error) {
        console.log(error);
        return res.json({ Error: error });
    }
}

const aguardarvisita = async (req, res) => {
    const id = req.body.id;
    try {

        const visita = await Visita.findByPk(id);

        if (!visita) {
            return res.json({ Error: "Visita não encontrada" });
        }

        const agenda = await AgendaServico.update({ ativo: 1 }, { where: { agenda_servico_id: visita.agenda_servico_id } });

        const estado = await Visita.update({ estado_servico: 'a aguardar' }, { where: { visita_id: id } });

        if (!agenda) {
            return res.json({ Error: "Agenda não encontrada" });
        }

        console.log("Agenda:", agenda);
        return res.json({ Status: "Success", agenda: agenda });


    } catch (error) {
        console.log(error);
        return res.json({ Error: error });
    }
}

const updateStatus = async (req, res) => {
    const id = req.body.id;
    try {
        const visita = await Visita.findByPk(id);
        if (!visita) {
            return res.json({ Error: "Visita não encontrada" });
        }

        if (!req.body.estado) {
            return res.json({ Error: "O estado do serviço não foi fornecido" });
        }

        // Atualiza o estado_servico da visita
        visita.estado_servico = req.body.estado;
        if (req.body.estado == "terminada") {
            visita.fim_visita = req.body.fim_visita;
            await visita.save();
        }
        else {
            visita.inicio_visita = req.body.inicio_visita;
            visita.iniciado_por_id = req.body.iniciado_por_id;
        }

        await visita.save(); // Salva as alterações no banco de dados

        return res.json({ Status: "Success", visita: visita });
    } catch (error) {
        console.log(error);
        return res.json({ Error: error });
    }
}

const sendEmailWithoutNextVisit = async (req, res) => {
    const id = req.body.id;
    try {
        const visita = await Visita.findByPk(id);

        if (!visita) {
            return res.json({ Error: "Visita não encontrada" });
        }

        const visit = await Visita.findByPk(req.body.id);
        const user = await ContaUtilizador.findByPk(visit.iniciado_por_id, {
            attributes: { exclude: ['password'] },
        }
        );
        const funcionario = await Funcionarios.findByPk(user.funcionario_id, { attributes: ['nome_completo', 'email', 'departamento_id', 'equipa_id'] });
        const contrato = await Contratos.findByPk(visit.contrato_id);
        const servicoid = await ContratosHasServicos.findOne({ where: { contrato_id: contrato.contrato_id } });
        const servico = await Servicos.findByPk(servicoid.servico_id);
        const tarefasConcluidas = await TarefasServicosVisita.findAll({ where: { visita_id: visit.visita_id, estado: 'concluido' } });
        const tarefasNaoConcluidas = await TarefasServicosVisita.findAll({ where: { visita_id: visit.visita_id, estado: 'em andamento' } });
        const anomalias = await AnomaliasVisita.findAll({ where: { visita_id: visit.visita_id } });
        const cliente = await Cliente.findByPk(contrato.cliente_id);
        const responsavelDepartamento = await ResponsavelDepartamento.findOne({ where: { departamento_id: funcionario.departamento_id } });
        const supervisor = await Funcionarios.findByPk(responsavelDepartamento.funcionario_id);
        const emailSupervisor = await ContaUtilizador.findOne({ where: { funcionario_id: supervisor.funcionario_id }, attributes: ['email'] });
        const equipa = await Funcionarios.findAll({ where: { equipa_id: funcionario.equipa_id } });
        const nomeEquipa = await Equipas.findByPk(funcionario.equipa_id, { attributes: ['nome'] });

        // console.log("Equipa:", equipa);
        // Colocar todos os dados em um único array
        const dataToSend = [
            user.dataValues,
            emailSupervisor.dataValues.email,
            visit.dataValues,
            funcionario.dataValues,
            contrato.dataValues,
            servico.dataValues,
            cliente.dataValues,
            tarefasConcluidas.map(tarefa => tarefa.dataValues),
            tarefasNaoConcluidas.map(tarefa => tarefa.dataValues),
            anomalias.map(anomalia => anomalia.dataValues),
            equipa.map(equipa => equipa.dataValues),
            nomeEquipa.dataValues,
        ];

        // Enviar o array para a função sendEmail
        sendEmail(dataToSend);
    } catch (error) {
        console.log(error);
        return res.json({ Error: error });
    }
}

const getvisitasnaorealizadaslvl3 = async (req, res) => {
    const empresaID = req.body.empresa_id;
    const departamentoID = req.body.departamento_id;
    try {
        const visitas = await Visita.findAll({
            where:{
                estado_servico: 'agendada',
            },
            order: [
                ['data_visita', 'ASC'],
                ['hora_visita_inicio', 'ASC']
            ],
            include: [
                {
                    model: AgendaServico,
                    attributes: ['empresa_id'],
                    where: { empresa_id: empresaID},
                    include: [
                        {
                            model: Equipas,
                            attributes: ['equipa_id', 'cor_equipa', 'nome'],
                            where: { departamento_id: departamentoID }
                        }
                    ]
                },

            ]
        });


        const visitasnaorealizadas = visitas.filter(visita => {
            const dataAtual = new Date();
            const horaAtual = new Date().getHours() + ":" + new Date().getMinutes() + ":00";

            const dataVisita = new Date(visita.data_visita);
            const horainicio = visita.hora_visita_inicio;
            console.log(horainicio);
            const [horainicioHora, horainicioMinuto, horainicioSegundo] = visita.hora_visita_inicio.split(':');
            const dataHoraVisita = new Date(
                dataVisita.getFullYear(),
                dataVisita.getMonth(),
                dataVisita.getDate(),
                parseInt(horainicioHora, 10),
                parseInt(horainicioMinuto, 10),
                parseInt(horainicioSegundo, 10)
            );

            console.log("Data e Hora Atual:", dataAtual);
            console.log("Data e Hora da Visita:", dataHoraVisita);

            return dataHoraVisita < dataAtual;
        });

        return res.json({ Status: "Success", visitasnaorealizadas: visitasnaorealizadas });
    } catch (error) {
        return res.json({ Error: error });
    }
};
const getvisitasnaorealizadaslvl4 = async (req, res) => {
const empresaID = req.body.empresa_id;

try {
    const visitas = await Visita.findAll({
        where:{
            estado_servico: 'agendada',
        },
        order: [
            ['data_visita', 'ASC'],
            ['hora_visita_inicio', 'ASC']
        ],
        include: [
            {
                model: AgendaServico,
                attributes: ['empresa_id'],
                where: { empresa_id: empresaID },
                include: [
                    {
                        model: Equipas,
                        attributes: ['equipa_id', 'cor_equipa', 'nome'],
                        
                    }
                ]
            },
        ]
    });
    console.log(visitas);
const visitasnaorealizadas = visitas.filter(visita => {
    const dataAtual = new Date();
    
   
    const dataVisita = new Date(visita.data_visita);
    const [horainicioHora, horainicioMinuto, horainicioSegundo] = visita.hora_visita_inicio.split(':');
                const dataHoraVisita = new Date(
                    dataVisita.getFullYear(),
                    dataVisita.getMonth(),
                    dataVisita.getDate(),
                    parseInt(horainicioHora, 10),
                    parseInt(horainicioMinuto, 10),
                    parseInt(horainicioSegundo, 10)
                );

                console.log("Data e Hora Atual:", dataAtual);
                console.log("Data e Hora da Visita:", dataHoraVisita);

                return dataHoraVisita < dataAtual;
            });
return res.json({ Status: "Success", visitasnaorealizadas: visitasnaorealizadas });
} catch (error) {
return res.json({ Error: error });
}
}


export {
    getVisitas,
    getVisitaById,
    createVisita,
    updateVisita,
    deleteVisita,
    getAllVisitas,
    updateStatus,
    getContactDetails,
    getEmpresaVisitas,
    getNivel1Visitas,
    sendEmailWithoutNextVisit,
    sendEmailWithNextVisit,
    getNivel3Visitas,
    getVisitasPendentes,
    getVisitasPendentesNivel4,
    acceptVisit,
    updateEstado,
    getvisitasnaorealizadaslvl3,
    getvisitasnaorealizadaslvl4,
    cancelarvisita, 
    aguardarvisita
}
