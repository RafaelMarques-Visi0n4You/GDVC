const ContaUtilizador = require('../models/contaUtilizadores');

const getContaUtilizadores = async (req, res) => {
    try {
        const contaUtilizadores = await ContaUtilizador.findAll();
        res.json({ Status : "Success", contaUtilizadores: contaUtilizadores });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getContaUtilizador = async (req, res) => {
    try {
        const contaUtilizador = await ContaUtilizador.findByPk(req.params.id);
        res.json({Status : "Success", contaUtilizador: contaUtilizador });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createContaUtilizador = async (req, res) => {
    try {
        const contaUtilizador = await ContaUtilizador.create(req.body);
        res.json({ Status : "Success", contaUtilizador: contaUtilizador });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateContaUtilizador = async (req, res) => {
    try {
        const contaUtilizador = await ContaUtilizador.findByPk(req.params.id);
        if (contaUtilizador) {
            contaUtilizador.update(req.body);
            res.json({ Status : "Success", contaUtilizador: contaUtilizador });
        } else {
            res.status(404).json({ error: "ContaUtilizador não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteContaUtilizador = async (req, res) => {
    try {
        const contaUtilizador = await ContaUtilizador.findByPk(req.params.id);
        if (contaUtilizador) {
            contaUtilizador.destroy();
            res.json({ Status : "Success", contaUtilizador: contaUtilizador });
        } else {
            res.status(404).json({ error: "ContaUtilizador não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports  = {
    getContaUtilizadores,
    getContaUtilizador,
    createContaUtilizador,
    updateContaUtilizador,
    deleteContaUtilizador
}