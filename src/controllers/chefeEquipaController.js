const ChefeEquipa = require("../models/chefeEquipa");

const getChefesEquipa = async (req, res) => {
    try {
        const chefesEquipa = await ChefeEquipa.findAll();
        return res.json({ Status: "Success", chefesEquipa: chefesEquipa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getChefeEquipaById = async (req, res) => {
    try {
        const chefeEquipa = await ChefeEquipa.findOne({
            where: {
                funcionario_id: req.params.id1,
                equipa_id: req.params.id2
            }
        });
        if (!chefeEquipa) {
            return res.json({ Error: "ChefeEquipa não encontrado" });
        }
        return res.json({ Status: "Success", chefeEquipa: chefeEquipa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const createChefeEquipa = async (req, res) => {
    try {
        const chefeEquipa = await ChefeEquipa.create(req.body);
        return res.json({ Status: "Success", chefeEquipa: chefeEquipa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const updateChefeEquipa = async (req, res) => {
    try {
        const chefeEquipa = await ChefeEquipa.findOne({
            where: {
                funcionario_id: req.params.id1,
                equipa_id: req.params.id2
            }
        });
        if (!chefeEquipa) {
            return res.json({ Error: "ChefeEquipa não encontrado" });
        }
        await chefeEquipa.update(req.body);
        return res.json({ Status: "Success", chefeEquipa: chefeEquipa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const deleteChefeEquipa = async (req, res) => {
    try {
        const chefeEquipa = await ChefeEquipa.findOne({
            where: {
                funcionario_id: req.params.id1,
                equipa_id: req.params.id2
            }
        });
        if (!chefeEquipa) {
            return res.json({ Error: "ChefeEquipa não encontrado" });
        }
        await chefeEquipa.destroy();
        return res.json({ Status: "Success", chefeEquipa: chefeEquipa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

module.exports = {
    getChefesEquipa,
    getChefeEquipaById,
    createChefeEquipa,
    updateChefeEquipa,
    deleteChefeEquipa
}
