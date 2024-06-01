import AnomaliaVisita from '../models/anomaliasVisita.js';
import moment from 'moment';
import cloudinary from 'cloudinary';


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
        let fotografiaUrl = 'null'; // Definir o valor padrão como 'null'
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { //
                resource_type: 'auto',
                secure: true
            });
            fotografiaUrl = result.secure_url; // URL da imagem do Cloudinary
            console.log(result.secure_url);
        }

        const anomaliaVisita = await AnomaliaVisita.create({
            visita_id: req.body.visita_id,
            anomalia: req.body.anomalia,
            estado: 'Pendente',
            criado_por_id: req.body.criado_por_id,
            fotografia: fotografiaUrl, // Usar a URL da imagem do Cloudinary ou 'null'
        });

        return res.json({ status: "Success", anomaliaVisita: anomaliaVisita });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

// const createAnomaliaVisita = async (req, res) => {
//     try {
//         const anomaliaVisita = await AnomaliaVisita.create(req.body);
//         return res.json({ Status: "Success", anomaliaVisita: anomaliaVisita });
//     } catch (error) {
//         return res.json({ Error: error });
//     }
// }

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


export {
    getAnomaliaVisitaById,
    createAnomaliaVisita,
    updateAnomaliaVisita,
    deleteAnomaliaVisita
}