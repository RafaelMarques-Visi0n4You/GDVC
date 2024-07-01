import TipoServicosHasEquipas from "../models/tipoSevicosHasEquipas.js";
import TipoServicos from "../models/tipoServicos.js";
import Equipas from "../models/equipas.js";

const getTipoServicosHasEquipas = async (req, res) => {
    try {
        const tipoServicosHasEquipas = await TipoServicosHasEquipas.findAll({
            order: [['tipoServicos_has_equipas_id', 'ASC']],
            include: [
                {
                    model: TipoServicos,
                    attributes: ['tipo_servico_id', 'nome']
                },
                {
                    model: Equipas,
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

const verificartiposervico = async (req, res) => {
    try {
        if(req.body.equipa_id){
           
                const tipoServicos = await TipoServicos.create({
                    nome: req.body.nome
                });
                
                    const tiposervicohasequipa = await TipoServicosHasEquipas.create({
                        tipo_servico_id: tipoServicos.tipo_servico_id,
                        equipa_id: req.body.equipa_id
                    });

                      
                return res.json({ Status: "Success", tiposervicohasequipa: tiposervicohasequipa });
            } 
       
            else {
                if(req.body.funcionario_id === null){
                   
                    const tipoServicos = await TipoServicos.create({
                        nome: req.body.nome
                    });
                return res.json({ Status: "Success", tipoServicos: tipoServicos });
            }
        }
        } catch (error) {
            return res.json({ Error: error.message });
        }
    }

export { getTipoServicosHasEquipas, getTipoServicosHasEquipasById, createTipoServicosHasEquipas, updateTipoServicosHasEquipas, deleteTipoServicosHasEquipas, verificartiposervico };