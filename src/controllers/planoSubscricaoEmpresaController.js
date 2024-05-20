const PlanoSubscricaoEmpresa = require('../models/planoSubscricaoEmpresas');

const getPlanoSubscricaoEmpresas = async (req, res) => {
    try {
        const planoSubscricaoEmpresas = await PlanoSubscricaoEmpresa.findAll();
        return res.json({ Status: "Success", planoSubscricaoEmpresas: planoSubscricaoEmpresas });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getPlanoSubscricaoEmpresaById = async (req, res) => {
    try {
        const planoSubscricaoEmpresa = await PlanoSubscricaoEmpresa.findByPk(req.params.id);
        if (!planoSubscricaoEmpresa) {
            return res.json({ Error: "Plano de subscricao não encontrado" });
        }
        return res.json({ Status: "Success", planoSubscricaoEmpresa: planoSubscricaoEmpresa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const createPlanoSubscricaoEmpresa = async (req, res) => {
    try {
        const planoSubscricaoEmpresa = await PlanoSubscricaoEmpresa.create(req.body);
        return res.json({ Status: "Success", planoSubscricaoEmpresa: planoSubscricaoEmpresa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const updatePlanoSubscricaoEmpresa = async (req, res) => {
    try {
        const planoSubscricaoEmpresa = await PlanoSubscricaoEmpresa.findByPk(req.params.id);
        if (!planoSubscricaoEmpresa) {
            return res.json({ Error: "Plano de subscricao não encontrado" });
        }
        await planoSubscricaoEmpresa.update(req.body);
        return res.json({ Status: "Success", planoSubscricaoEmpresa: planoSubscricaoEmpresa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const deletePlanoSubscricaoEmpresa = async (req, res) => {
    try {
        const planoSubscricaoEmpresa = await PlanoSubscricaoEmpresa.findByPk(req.params.id);
        if (!planoSubscricaoEmpresa) {
            return res.json({ Error: "Plano de subscricao não encontrado" });
        }
        await planoSubscricaoEmpresa.destroy();
        return res.json({ Status: "Success", planoSubscricaoEmpresa: planoSubscricaoEmpresa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

module.exports = {
    getPlanoSubscricaoEmpresas,
    getPlanoSubscricaoEmpresaById,
    createPlanoSubscricaoEmpresa,
    updatePlanoSubscricaoEmpresa,
    deletePlanoSubscricaoEmpresa
}   