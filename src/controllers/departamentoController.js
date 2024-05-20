const Departamento = require('../models/departamentos');

const getDepartamentos = async (req, res) => {
    try {
        const departamentos = await Departamento.findAll();
        return res.json({ Status: "Success", departamentos: departamentos });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getDepartamentoById = async (req, res) => {
    try {
        const departamento = await Departamento.findByPk(req.params.id);
        if (!departamento) {
            return res.json({ Error: "Departamento não encontrado" });
        }
        return res.json({ Status: "Success", departamento: departamento });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const createDepartamento = async (req, res) => {
    try {
        const departamento = await Departamento.create(req.body);
        return res.json({ Status: "Success", departamento: departamento });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const updateDepartamento = async (req, res) => {
    try {
        const departamento = await Departamento.findByPk(req.params.id);
        if (!departamento) {
            return res.json({ Error: "Departamento não encontrado" });
        }
        await departamento.update(req.body);
        return res.json({ Status: "Success", departamento: departamento });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const deleteDepartamento = async (req, res) => {
    try {
        const departamento = await Departamento.findByPk(req.params.id);
        if (!departamento) {
            return res.json({ Error: "Departamento não encontrado" });
        }
        await departamento.destroy();
        return res.json({ Status: "Success", departamento: departamento });
    } catch (error) {
        return res.json({ Error: error });
    }
}

module.exports = {
    getDepartamentos,
    getDepartamentoById,
    createDepartamento,
    updateDepartamento,
    deleteDepartamento
}
