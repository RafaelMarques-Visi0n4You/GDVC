import Equipa from '../models/equipas.js';

const getEquipas = async (req, res) => {
    try {
        const equipas = await Equipa.findAll({ 
            order: [
                ['equipa_id', 'ASC']
            ],
            where: {
                empresa_id: req.body.id || req.body.empresa_id
            }
            
        });
        return res.json({ Status: "Success", equipas: equipas });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getByDepartamento = async (req, res) => {
    try {
        const equipas = await Equipa.findAll({
            where: {
                departamento_id: req.params.id
            }
        });
        if (!equipas) {
            return res.json({ Error: "Equipas não encontradas" });
        }

        return res.json({ Status: "Success", equipas: equipas });
    } catch (error) {
        return res.json({ Error: error });
    }
}



const gettodasequipas = async (req, res) => {
    try {
        const equipas = await Equipa.findAll({
            order: [
                ['equipa_id', 'ASC']
            ]
        }
        );
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
        return res.json({ Status: "Success", equipa: equipa, id: equipa.equipa_id });
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
        const novaequipa = await Equipa.update(req.body,
            {
                where: {
                    equipa_id: req.params.id
                }
            }
        );
        console.log(req.body);
        return res.json({ Status: "Success", equipa: novaequipa });
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

const setAcesso = async (req, res) => {
    try {
        const acesso = await Equipa.findByPk(req.params.id);
        if (!acesso) {
            res.status(404).json({ error: "Equipa não encontrado" });
        } else {
            const updateAcesso = !acesso.ativo ? 1 : 0;
            acesso.ativo = updateAcesso;
            await acesso.save();
            res.json(updateAcesso);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {
    getEquipas,
    getEquipaById,
    createEquipa,
    updateEquipa,
    deleteEquipa,
    gettodasequipas,
    setAcesso,
    getByDepartamento
}