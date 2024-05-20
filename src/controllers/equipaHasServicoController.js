import EquipaHasServico from '../models/equipasHasServicos.js';


const getEquipaHasServicos = async (req, res) => {
    try {
        const equipaHasServicos = await EquipaHasServico.findAll();
        return res.json({ Status: "Success", equipaHasServicos: equipaHasServicos });
    } catch (error) {
        return res.json({ Error: error });
    }
}




const getEquipaHasServicoById = async (req, res) => {
    try {
        const equipaHasServico = await EquipaHasServico.findOne({
            where: {
                equipa_id: req.params.id1,
                servico_id: req.params.id2
            }
        });
        if (!equipaHasServico) {
            return res.json({ Error: "EquipaHasServico não encontrado" });
        }
        return res.json({ Status: "Success", equipaHasServico: equipaHasServico });
    } catch (error) {
        return res.json({ Error: error });
    }
}



const createEquipaHasServico = async (req, res) => {
    try {
        const equipaHasServico = await EquipaHasServico.create(req.body);
        return res.json({ Status: "Success", equipaHasServico: equipaHasServico });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const updateEquipaHasServico = async (req, res) => {
    try {
        const equipaHasServico = await EquipaHasServico.findOne({
            where: {
                equipa_id: req.params.id1,
                servico_id: req.params.id2
            }
        })
        if (!equipaHasServico) {
            return res.json({ Error: "EquipaHasServico não encontrado" });
        }
        await equipaHasServico.update(req.body);
        return res.json({ Status: "Success", equipaHasServico: equipaHasServico });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const deleteEquipaHasServico = async (req, res) => {
    try {
        const equipaHasServico = await EquipaHasServico.findOne({
            where: {
                equipa_id: req.params.id1,
                servico_id: req.params.id2
            }
        })
        if (!equipaHasServico) {
            return res.json({ Error: "EquipaHasServico não encontrado" });
        }
        await equipaHasServico.destroy();
        return res.json({ Status: "Success", equipaHasServico: equipaHasServico });
    } catch (error) {
        return res.json({ Error: error });
    }
}

export {
    getEquipaHasServicos,
    getEquipaHasServicoById,
    createEquipaHasServico,
    updateEquipaHasServico,
    deleteEquipaHasServico
}