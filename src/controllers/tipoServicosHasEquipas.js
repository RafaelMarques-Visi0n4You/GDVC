import TipoServicosHasEquipas from "../models/tipoSevicosHasEquipas.js";

const getTipoServicosHasEquipas = async (req, res) => {
    try {
        const tipoServicosHasEquipas = await TipoServicosHasEquipas.findAll({
            order: [['tipoServicos_has_equipas_id', 'ASC']],
            include: [
                {
                    model: 'tipo_servicos',
                    attributes: ['tipo_servico_id', 'nome']
                },
                {
                    model: 'equipas',
                    attributes: ['equipa_id', 'nome']
                }
            ]
            
        });
        return res.json({ Status: "Success", tipoServicosHasEquipas: tipoServicosHasEquipas });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getTipoServicosHasEquipasById = async (req, res) => {
    try {
        const tipoServicosHasEquipas = await TipoServicosHasEquipas.findByPk(req.params.id);
        if (!tipoServicosHasEquipas) {
            return res.json({ Error: "TipoServicosHasEquipas não encontrado" });
        }
        return res.json({ Status: "Success", tipoServicosHasEquipas: tipoServicosHasEquipas });
    } catch (error) {
        return res.json({ Error: error });
    }
}	

const createTipoServicosHasEquipas = async (req, res) => {
    try {
        const tipoServicosHasEquipas = await TipoServicosHasEquipas.create(req.body);
        return res.json({ Status: "Success", tipoServicosHasEquipas: tipoServicosHasEquipas });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const updateTipoServicosHasEquipas = async (req, res) => {
    try {
        const tipoServicosHasEquipas = await TipoServicosHasEquipas.findByPk(req.params.id);
        if (!tipoServicosHasEquipas) {
            return res.json({ Error: "TipoServicosHasEquipas não encontrado" });
        }
        await tipoServicosHasEquipas.update(req.body);
        return res.json({ Status: "Success", tipoServicosHasEquipas: tipoServicosHasEquipas });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const deleteTipoServicosHasEquipas = async (req, res) => {
    try {
        const tipoServicosHasEquipas = await TipoServicosHasEquipas.findByPk(req.params.id);
        if (!tipoServicosHasEquipas) {
            return res.json({ Error: "TipoServicosHasEquipas não encontrado" });
        }
        await tipoServicosHasEquipas.destroy();
        return res.json({ Status: "Success", tipoServicosHasEquipas: tipoServicosHasEquipas });
    } catch (error) {
        return res.json({ Error: error });
    }
}

export { getTipoServicosHasEquipas, getTipoServicosHasEquipasById, createTipoServicosHasEquipas, updateTipoServicosHasEquipas, deleteTipoServicosHasEquipas };