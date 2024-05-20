const Contrato = require('../models/contratos');
const ContratosHasServicos = require('../models/contratosHasServicos');
const Servicos = require('../models/servicos');

const getContratos = async (req, res) => {
    try {
        const contratos = await Contrato.findAll();
        return res.json({ Status: "Success", contratos: contratos });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getContratoById = async (req, res) => {
    try {
        const contrato = await Contrato.findByPk(req.body.id,{
            include:{
                all:true,
            }
        });
        if (!contrato) {
            return res.json({ Error: "Contrato não encontrado" });
        }

        const servicoid = await ContratosHasServicos.findOne({
            where:{
                contrato_id:req.body.id
            }
        });

        if (!servicoid) {
            return res.json({ Error: "Servicoid não encontrado" });
        }

        const servico = await Servicos.findByPk(servicoid.servico_id,{
            attributes: ['nome','descricao']
        });

        if (!servico) {
            return res.json({ Error: "Servico não encontrado" });
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
        return res.json({ Status: "Success", contrato: contrato });
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

module.exports = { 
    getContratos, 
    getContratoById, 
    createContrato, 
    updateContrato, 
    deleteContrato };