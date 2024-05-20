const ResponsavelDepartamento = require('../models/responsavelDepartamento');

const getResponsavelDepartamentos = async (req, res) => {
    try {
        const responsavelDepartamentos = await ResponsavelDepartamento.findAll();
        return res.json({ Status: "Success", responsavelDepartamentos: responsavelDepartamentos });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getResponsavelDepartamentoById = async (req, res) => {
    try {
        const responsavelDepartamento = await ResponsavelDepartamento.findOne({
            where: {
                departamento_id: req.params.id1,
                funcionario_id: req.params.id2
            }
        });
        if (!responsavelDepartamento) {
            return res.json({ Error: "ResponsavelDepartamento não encontrado" });
        }
        return res.json({ Status: "Success", responsavelDepartamento: responsavelDepartamento });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const createResponsavelDepartamento = async (req, res) => {
    try {
        const responsavelDepartamento = await ResponsavelDepartamento.create(req.body);
        return res.json({ Status: "Success", responsavelDepartamento: responsavelDepartamento });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const updateResponsavelDepartamento = async (req, res) => {
    try {
        const responsavelDepartamento = await ResponsavelDepartamento.findOne({
            where: {
                departamento_id: req.params.id1,
                funcionario_id: req.params.id2
            }
        });
        if (!responsavelDepartamento) {
            return res.json({ Error: "ResponsavelDepartamento não encontrado" });
        }
        await responsavelDepartamento.update(req.body);
        return res.json({ Status: "Success", responsavelDepartamento: responsavelDepartamento });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const deleteResponsavelDepartamento = async (req, res) => {
    try {
        const responsavelDepartamento = await ResponsavelDepartamento.findOne({
            where: {
                departamento_id: req.params.id1,
                funcionario_id: req.params.id2
            }
        });
        if (!responsavelDepartamento) {
            return res.json({ Error: "ResponsavelDepartamento não encontrado" });
        }
        await responsavelDepartamento.destroy();
        return res.json({ Status: "Success", responsavelDepartamento: responsavelDepartamento });
    } catch (error) {
        return res.json({ Error: error });
    }
}

module.exports = { 
    getResponsavelDepartamentos, 
    getResponsavelDepartamentoById, 
    createResponsavelDepartamento, 
    updateResponsavelDepartamento, 
    deleteResponsavelDepartamento 
}

