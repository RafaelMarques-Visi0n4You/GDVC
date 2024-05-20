const AnomaliaVisita = require("../models/anomaliasVisita");
const moment = require('moment');


const getAnomaliaVisitaById = async (req, res) => {
    try {
        const anomaliaVisita = await AnomaliaVisita.findAll({
            where: {
                visita_id: req.body.id
            },
            order: [['anomalia_visita_id', 'ASC']]
        });
        if (!anomaliaVisita || anomaliaVisita.length === 0) {
            return res.json({ Error: "AnomaliaVisita não encontrado" });
        }
 
        const notaAnomaliaFormatted = anomaliaVisita.map(anomalia => ({
            ...anomalia.toJSON(),
            data_criacao: moment(anomalia.data_criacao).add(1, 'hours').format('DD/MM/YYYY - HH[h]mm')
        }));




        return res.json({ Status: "Success", anomaliaVisita: notaAnomaliaFormatted });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const createAnomaliaVisita = async (req, res) => {
    try {
        const anomaliaVisita = await AnomaliaVisita.create(req.body);
        return res.json({ Status: "Success", anomaliaVisita: anomaliaVisita });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const updateAnomaliaVisita = async (req, res) => {
    try {
        const anomaliaVisita = await AnomaliaVisita.findOne({
            where: {
                visita_id: req.params.id1
            }
        });
        if (!anomaliaVisita) {
            return res.json({ Error: "AnomaliaVisita não encontrado" });
        }
        await anomaliaVisita.update(req.body);
        return res.json({ Status: "Success", anomaliaVisita: anomaliaVisita });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const deleteAnomaliaVisita = async (req, res) => {
    try {
        const anomaliaVisita = await AnomaliaVisita.findByPk(req.body.id);
        if (!anomaliaVisita) {
            return res.json({ Error: "AnomaliaVisita não encontrado" });
        }
        await anomaliaVisita.destroy();
        return res.json({ Status: "Success", anomaliaVisita: anomaliaVisita });
    } catch (error) {
        return res.json({ Error: error });
    }
}

module.exports = { 
    getAnomaliaVisitaById, 
    createAnomaliaVisita, 
    updateAnomaliaVisita, 
    deleteAnomaliaVisita 
};