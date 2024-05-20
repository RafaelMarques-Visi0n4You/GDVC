const Empresa = require('../models/empresas');

const getEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.findAll();
        return res.json({ Status: "Success", empresas: empresas });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getEmpresaById = async (req, res) => {
    try {
        const empresa = await Empresa.findByPk(req.params.id);
        if (!empresa) {
            return res.json({ Error: "Empresa não encontrada" });
        }
        return res.json({ Status: "Success", empresa: empresa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const createEmpresa = async (req, res) => {
    try {
        const empresa = await Empresa.create(req.body);
        return res.json({ Status: "Success", empresa: empresa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const updateEmpresa = async (req, res) => {
    try {
        const empresa = await Empresa.findByPk(req.params.id);
        if (!empresa) {
            return res.json({ Error: "Empresa não encontrada" });
        }
        await empresa.update(req.body);
        return res.json({ Status: "Success", empresa: empresa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const deleteEmpresa = async (req, res) => {
    try {
        const empresa = await Empresa.findByPk(req.params.id);
        if (!empresa) {
            return res.json({ Error: "Empresa não encontrada" });
        }
        await empresa.destroy();
        return res.json({ Status: "Success", empresa: empresa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

module.exports = {
    getEmpresas,
    getEmpresaById,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa
}

