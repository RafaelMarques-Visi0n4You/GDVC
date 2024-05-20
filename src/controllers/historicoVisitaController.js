const HistoricoVisita = require('../models/historicoVisitas');

const getHistoricoVisitas = async (req, res) => {
    try {
        const historicoVisitas = await HistoricoVisita.findAll();
        return res.json({ Status: "Success", historicoVisitas: historicoVisitas });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getHistoricoVisitaById = async (req, res) => {
    try {
        const historicoVisita = await HistoricoVisita.findByPk(req.params.id);
        if (!historicoVisita) {
            return res.json({ Error: "Histórico de Visita não encontrado" });
        }
        return res.json({ Status: "Success", historicoVisita: historicoVisita });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const createHistoricoVisita = async (req, res) => {
    try {
        const historicoVisita = await HistoricoVisita.create(req.body);
        return res.json({ Status: "Success", historicoVisita: historicoVisita });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const updateHistoricoVisita = async (req, res) => {
    try {
        const historicoVisita = await HistoricoVisita.findByPk(req.params.id);
        if (!historicoVisita) {
            return res.json({ Error: "Histórico de Visita não encontrado" });
        }
        await historicoVisita.update(req.body);
        return res.json({ Status: "Success", historicoVisita: historicoVisita });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const deleteHistoricoVisita = async (req, res) => {
    try {
        const historicoVisita = await HistoricoVisita.findByPk(req.params.id);
        if (!historicoVisita) {
            return res.json({ Error: "Histórico de Visita não encontrado" });
        }
        await historicoVisita.destroy();
        return res.json({ Status: "Success", historicoVisita: historicoVisita });
    } catch (error) {
        return res.json({ Error: error });
    }
}

module.exports = { 
    getHistoricoVisitas, 
    getHistoricoVisitaById, 
    createHistoricoVisita, 
    updateHistoricoVisita, 
    deleteHistoricoVisita 
};
