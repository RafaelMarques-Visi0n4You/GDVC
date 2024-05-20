const Visita = require('../models/visitas');
const Servicos = require('../models/servicos');
const Contratos = require('../models/contratos');
const ContratosHasServicos = require('../models/contratosHasServicos');
const AgendaServico = require('../models/agendaServicos');
const ChefeEquipa = require('../models/chefeEquipa');
const Empresas = require('../models/empresas');
const Equipas = require('../models/equipas');


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
                    attributes: ['contrato_id', 'nome', 'morada_servico', 'cod_postal_servico','localidade_servico'],
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

const deleteVisita = async (req, res) => {
    try {
        const visita = await Visita.findByPk(req.params.id);
        if (!visita) {
            return res.json({ Error: "Visita não encontrada" });
        }
        await visita.destroy();
        return res.json({ Status: "Success", visita: visita });
    } catch (error) {
        return res.json({ Error: error });
    }
}   

//mudar o estado 

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
        }
        else {
            visita.inicio_visita = req.body.inicio_visita;
        }
        
        await visita.save(); // Salva as alterações no banco de dados
        
        return res.json({ Status: "Success", visita: visita });
    } catch (error) {
        return res.json({ Error: error });
    }
}




module.exports = { 
    getVisitas, 
    getVisitaById, 
    createVisita, 
    updateVisita, 
    deleteVisita,
    getAllVisitas,
    updateStatus
}
