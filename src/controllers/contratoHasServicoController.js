import ContratoHasServico from '../models/contratosHasServicos.js';

const getContratoHasServicos = async (req, res) => {
    try {
        const contratoHasServicos = await ContratoHasServico.findAll();
        return res.json({ Status: "Success", contratoHasServicos: contratoHasServicos });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getContratoHasServicoById = async (req, res) => {
    try {
        const contratoHasServico = await ContratoHasServico.findOne({
            where: {
                servico_id: req.params.id1,
                contrato_id: req.params.id2
            }
        });
        if (!contratoHasServico) {
            return res.json({ Error: "ContratoHasServico não encontrado" });
        }
        return res.json({ Status: "Success", contratoHasServico: contratoHasServico });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const createContratoHasServico = async (req, res) => {
    try {
        const contratoHasServico = await ContratoHasServico.create(req.body);
        return res.json({ Status: "Success", contratoHasServico: contratoHasServico });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const updateContratoHasServico = async (req, res) => {
    try {
        const contratoHasServico = await ContratoHasServico.findOne({
            where: {
                servico_id: req.params.id1,
                contrato_id: req.params.id2
            }
        })
        if (!contratoHasServico) {
            return res.json({ Error: "ContratoHasServico não encontrado" });
        }
        await contratoHasServico.update(req.body);
        return res.json({ Status: "Success", contratoHasServico: contratoHasServico });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const deleteContratoHasServico = async (req, res) => {
    try {
        const contratoHasServico = await ContratoHasServico.findOne({
            where: {
                servico_id: req.params.id1,
                contrato_id: req.params.id2
            }
        })
        if (!contratoHasServico) {
            return res.json({ Error: "ContratoHasServico não encontrado" });
        }
        await contratoHasServico.destroy();
        return res.json({ Status: "Success", contratoHasServico: contratoHasServico });
    } catch (error) {
        return res.json({ Error: error });
    }
}


export {
    getContratoHasServicos,
    getContratoHasServicoById,
    createContratoHasServico,
    updateContratoHasServico,
    deleteContratoHasServico
}