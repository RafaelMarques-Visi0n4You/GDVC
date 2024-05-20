const Funcionario = require('../models/funcionarios');

const getFuncionarios = async (req, res) => {
    try {
        const funcionarios = await Funcionario.findAll();
        res.json({ Status : "Success", funcionarios: funcionarios });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getFuncionario = async (req, res) => {
    try {
        const funcionario = await Funcionario.findByPk(req.params.id);
        res.json({ Status : "Success", funcionario: funcionario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createFuncionario = async (req, res) => {
    try {
        const funcionario = await Funcionario.create(req.body);
        res.json({ Status : "Success", funcionario: funcionario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateFuncionario = async (req, res) => {
    try {
        const funcionario = await Funcionario.findByPk(req.params.id);
        if (funcionario) {
            funcionario.update(req.body);
            res.json({Status : "Success", funcionario: funcionario });
        } else {
            res.status(404).json({ error: "Funcionario não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteFuncionario = async (req, res) => {
    try {
        const funcionario = await Funcionario.findByPk(req.params.id);
        if (funcionario) {
            funcionario.destroy();
            res.json({ Status : "Success", funcionario: funcionario });
        } else {
            res.status(404).json({ error: "Funcionario não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getFuncionarios,
    getFuncionario,
    createFuncionario,
    updateFuncionario,
    deleteFuncionario
}