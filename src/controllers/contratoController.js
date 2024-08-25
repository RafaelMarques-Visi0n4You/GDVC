import Contrato from '../models/contratos.js';
import ContratosHasServicos from '../models/contratosHasServicos.js';
import Servicos from '../models/servicos.js';
import clientes from '../models/clientes.js';

const getContratos = async (req, res) => {
    try {
        const contratos = await Contrato.findAll({
            include: [
                {
                    model: clientes,
                    attributes: ['nome_completo'],
                },
            ],
            order: [
                ['contrato_id', 'ASC']
            ],

        });
        return res.json({ Status: "Success", contratos: contratos });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getContratoById = async (req, res) => {
    try {
        const contrato = await Contrato.findByPk(req.body.id, {
            include: {
                all: true,
            }
        });
        if (!contrato) {
            return res.json({ Error: "Contrato não encontrado" });
        }

        const servicoid = await ContratosHasServicos.findOne({
            where: {
                contrato_id: req.body.id
            }
        });

        if (!servicoid) {
            return res.json({ Error: "Servicoid não encontrado" });
        }

        const servico = await Servicos.findByPk(servicoid.servico_id, {
            attributes: ['nome', 'descricao', 'servico_id']
        });

        if (!servico) {
            return res.json({ Error: "Servico não encontrado" });
        }

        const contratoHasServico = await ContratosHasServicos.findOne({
            where: {
                contrato_id: req.body.id
            }
        });

        if (!contratoHasServico) {
            return res.json({ Error: "ContratoHasServico não encontrado" });
        }


        contrato.dataValues.servico = servico;

        


        return res.json({ Status: "Success", contrato: contrato });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const createContrato = async (req, res) => {
    try {
        const contrato = await Contrato.create(req.body);
        const contratoHasServico = await ContratosHasServicos.create({
            contrato_id: contrato.contrato_id,
            servico_id: req.body.servico_id,
            data_contratacao: contrato.data_inicio,
            prioritario: req.body.prioritario,
        });
        return res.json({ Status: "Success", contrato: contrato, contratoHasServico: contratoHasServico });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const updateContrato = async (req, res) => {
    try {
        const contrato = await Contrato.findByPk(req.params.id);
        if (!contrato) {
            return res.json({ Error: "Contrato não encontrado" });
        }

        const contratohasservico = await ContratosHasServicos.findOne({
            where: {
                contrato_id: req.params.id
            }
        });

        if (!contratohasservico) {
            return res.json({ Error: "ContratoHasServico não encontrado" });
        }

        await contratohasservico.update({
            servico_id: req.body.servico_id,
            data_contratacao: contrato.data_inicio,
            prioritario: req.body.prioritario,
        });

        await contrato.update(req.body);
        return res.json({ Status: "Success", contrato: contrato });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const deleteContrato = async (req, res) => {
    try {
        const contrato = await Contrato.findByPk(req.params.id);
        if (!contrato) {
            return res.json({ Error: "Contrato não encontrado" });
        }
        await contrato.destroy();
        return res.json({ Status: "Success", contrato: contrato });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getClientContract = async (req, res) => {
    try {
        const contrato = await Contrato.findAll({
            where: {
                cliente_id: req.body.id
            }
        });

        if (!contrato) {
            return res.json({ Error: "Contrato não encontrado" });
        }

        return res.json({ Status: "Success", contrato: contrato });
    }
    catch (error) {
        return res.json({ Error: error });
    }
}


const setAcesso = async (req, res) => {
    try {
        const acesso = await Contrato.findByPk(req.params.id);
        if (!acesso) {
            res.status(404).json({ error: "Contrato não encontrado" });
        } else {
            const updateAcesso = !acesso.ativo ? 1 : 0;
            acesso.ativo = updateAcesso;
            await acesso.save();
            res.json(updateAcesso);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



export {
    getContratos,
    getContratoById,
    createContrato,
    updateContrato,
    deleteContrato,
    getClientContract,
    setAcesso
}