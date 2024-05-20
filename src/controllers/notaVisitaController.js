const NotaVisita = require('../models/notasVisitas');
const moment = require('moment');



const getNotaByVisita = async (req, res) => {
    try {
        const notaVisita = await NotaVisita.findAll(
            { where: { visita_id: req.body.id },
            order: [['notas_id', 'ASC']]}
        );

        if (!notaVisita || notaVisita.length === 0) {
            return res.json({ Error: "Nota de Visita não encontrada" });
        }

        const notaVisitaFormatted = notaVisita.map(nota => ({
            ...nota.toJSON(),
            data_criacao: moment(nota.data_criacao).add(1, 'hours').format('DD/MM/YYYY - HH[h]mm')
        }));

        return res.json({ Status: "Success", notaVisita: notaVisitaFormatted });
    } catch (error) {
        return res.json({ Error: error });
    }
}



const createNotaVisita = async (req, res) => {
    try {
        const notaVisita = await NotaVisita.create(req.body);
        return res.json({ Status: "Success", notaVisita: notaVisita });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const updateNotaVisita = async (req, res) => {
    try {
        const notaVisita = await NotaVisita.findByPk(req.params.id);
        if (!notaVisita) {
            return res.json({ Error: "Nota de Visita não encontrada" });
        }
        await notaVisita.update(req.body);
        return res.json({ Status: "Success", notaVisita: notaVisita });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const deleteNotaVisita = async (req, res) => {
    try {
        const notaVisita = await NotaVisita.findByPk(req.body.id);
        if (!notaVisita) {
            return res.json({ Error: "Nota de Visita não encontrada" });
        }
        await notaVisita.destroy();
        return res.json({ Status: "Success", notaVisita: notaVisita });
    } catch (error) {
        return res.json({ Error: error });
    }
}

module.exports = { 
    getNotaByVisita, 
    createNotaVisita, 
    updateNotaVisita, 
    deleteNotaVisita 
};
