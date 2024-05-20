const PlanoSubscricao = require('../models/planoSubscricao');

const getPlanoSubscricao = async (req, res) => {
    try {
        const planos = await PlanoSubscricao.findAll();
        return res.json(planos);
    } catch (error) {
        return res.status(500).json({ Error: error });
    }
    }

const getPlanoSubscricaoById = async (req, res) => {
    try {
        const plano = await PlanoSubscricao.findByPk(req.params.id);
        if (!plano) {
            return res.status(404).json({ Error: "Plano de subscricao não encontrado" });
        }
        return res.json(plano);
    } catch (error) {
        return res.status(500).json({ Error: error });
    }
}

const createPlanoSubscricao = async (req, res) => {
    try {
        const plano = await PlanoSubscricao.create(req.body);
        return res.json(plano);
    } catch (error) {
        return res.status(500).json({ Error: error });
    }
}

const updatePlanoSubscricao = async (req, res) => {
    try {
        const plano = await PlanoSubscricao.findByPk(req.params.id);
        if (!plano) {
            return res.status(404).json({ Error: "Plano de subscricao não encontrado" });
        }
        await plano.update(req.body);
        return res.json(plano);
    } catch (error) {
        return res.status(500).json({ Error: error });
    }
}

const deletePlanoSubscricao = async (req, res) => {
    try {
        const plano = await PlanoSubscricao.findByPk(req.params.id);
        if (!plano) {
            return res.status(404).json({ Error: "Plano de subscricao não encontrado" });
        }
        await plano.destroy();
        return res.json({ Status: "Success" });
    } catch (error) {
        return res.status(500).json({ Error: error });
    }
}

module.exports = {
    getPlanoSubscricao,
    getPlanoSubscricaoById,
    createPlanoSubscricao,
    updatePlanoSubscricao,
    deletePlanoSubscricao
};