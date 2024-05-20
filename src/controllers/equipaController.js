const Equipa = require('../models/equipas');

const getEquipas = async (req, res) => {
    try {
        const equipas = await Equipa.findAll();
        return res.json({ Status: "Success", equipas: equipas });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getEquipaById = async (req, res) => {
    try {
        const equipa = await Equipa.findByPk(req.params.id);
        if (!equipa) {
            return res.json({ Error: "Equipa não encontrada" });
        }
        return res.json({ Status: "Success", equipa: equipa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const createEquipa = async (req, res) => {
    try {
        const equipa = await Equipa.create(req.body);
        return res.json({ Status: "Success", equipa: equipa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const updateEquipa = async (req, res) => {
    try {
        const equipa = await Equipa.findByPk(req.params.id);
        if (!equipa) {
            return res.json({ Error: "Equipa não encontrada" });
        }
        await equipa.update(req.body);
        return res.json({ Status: "Success", equipa: equipa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const deleteEquipa = async (req, res) => {
    try {
        const equipa = await Equipa.findByPk(req.params.id);
        if (!equipa) {
            return res.json({ Error: "Equipa não encontrada" });
        }
        await equipa.destroy();
        return res.json({ Status: "Success", equipa: equipa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

module.exports = {
    getEquipas,
    getEquipaById,
    createEquipa,
    updateEquipa,
    deleteEquipa
}