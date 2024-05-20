import Empresa from '../models/empresas.js';
import PlanoSubscricaoEmpresa from '../models/planoSubscricaoEmpresas.js';
import planoSubscricao from '../models/planoSubscricao.js';

const getEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.findAll({
           where: {
                empresa_id: req.body.empresa_id || req.body.id,
              } 
        });
        return res.json({ Status: "Success", empresas: empresas });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getEmpresaById = async (req, res) => {
    try {
        const empresa = await Empresa.findByPk();
        const plano = await PlanoSubscricaoEmpresa.findOne({
            where: {
                empresa_id: req.params.id
            },
        });
        const tipoplano = await planoSubscricao.findOne({
            where: {
                plano_subscricao_id: plano.plano_subscricao_id
            }
        });


        if (!empresa) {
            return res.json({ Error: "Empresa não encontrada" });
        }
        return res.json({ Status: "Success", empresa: empresa, plano: plano, tipoplano: tipoplano });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const createEmpresa = async (req, res) => {
    try {
        const empresa = await Empresa.create(req.body);
        console.log("agdf:", req.body.plano_subscricao_id);
        console.log("safdas:", empresa.id);
        const tipoplano = await PlanoSubscricaoEmpresa.create(
            {
                empresa_id: empresa.empresa_id,
                plano_subscricao_id: req.body.plano_subscricao_id,
            }
        )
        return res.json({ Status: "Success", empresa: empresa, tipoplano: tipoplano });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const updateEmpresa = async (req, res) => {
    try {
        const empresa = await Empresa.findByPk(req.params.id);
        const plano = await PlanoSubscricaoEmpresa.findOne({
            where: {
                empresa_id: req.params.id
            }
        });
        if (!empresa) {
            return res.json({ Error: "Empresa não encontrada" });
        }
        await empresa.update(req.body);
        await plano.update({
            plano_subscricao_id: req.body.plano_subscricao_id
        });
        return res.json({ Status: "Success", empresa: empresa, plano: plano });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const deleteEmpresa = async (req, res) => {
    try {
        const empresa = await Empresa.findByPk(req.params.id);
        if (!empresa) {
            return res.json({ Error: "Empresa não encontrada" });
        }
        await empresa.destroy();
        return res.json({ Status: "Success", empresa: empresa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const setAcesso = async (req, res) => {
    try {
        const acesso = await Empresa.findByPk(req.params.id);
        if (!acesso) {
            res.status(404).json({ error: "Empresa não encontrada" });
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
    getEmpresas,
    getEmpresaById,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa,
    setAcesso
}


