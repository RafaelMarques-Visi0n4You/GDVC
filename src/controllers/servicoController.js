const servico = require('../models/servicos');

const getServicos = async (req, res) => {
    try {
        const servicos = await servico.findAll();
        res.json({ Status : "Success", servicos: servicos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getServico = async (req, res) => {
    try {
        const servicos = await servico.findByPk(req.params.id);
        res.json({Status : "Success", servicos: servicos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createServico = async (req, res) => {
    try {
        const servicos = await servico.create(req.body);
        res.json({ Status : "Success", servicos: servicos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateServico = async (req, res) => {
    try {
        const servicos = await servico.findByPk(req.params.id);
        if (servicos) {
            servicos.update(req.body);
            res.json({ Status : "Success", servicos: servicos });
        } else {
            res.status(404).json({ error: "Servico não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteServico = async (req, res) => {
    try {
        const servicos = await servico.findByPk(req.params.id);
        if (servicos) {
            servicos.destroy();
            res.json({ Status : "Success", servicos: servicos });
        } else {
            res.status(404).json({ error: "Servico não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports  = {
    getServicos,
    getServico,
    createServico,
    updateServico,
    deleteServico
}