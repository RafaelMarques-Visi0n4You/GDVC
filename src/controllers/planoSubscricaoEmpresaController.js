import PlanoSubscricao from '../models/planoSubscricao.js';
import PlanoSubscricaoEmpresa from '../models/planoSubscricaoEmpresas.js';

const getPlanoSubscricaoEmpresas = async (req, res) => {
    try {
        const planoSubscricaoEmpresas = await PlanoSubscricaoEmpresa.findAll({
            include: {
                model: PlanoSubscricao,
            }
        });
        return res.json({ Status: "Success", planoSubscricaoEmpresas: planoSubscricaoEmpresas });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getPlanoSubscricaoEmpresaById = async (req, res) => {
    try {
        const planoSubscricaoEmpresa = await PlanoSubscricaoEmpresa.findByPk(req.params.id);
        if (!planoSubscricaoEmpresa) {
            return res.json({ Error: "Plano de subscricao não encontrado" });
        }
        return res.json({ Status: "Success", planoSubscricaoEmpresa: planoSubscricaoEmpresa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const createPlanoSubscricaoEmpresa = async (req, res) => {
    try {
        const planoSubscricaoEmpresa = await PlanoSubscricaoEmpresa.create(req.body);
        return res.json({ Status: "Success", planoSubscricaoEmpresa: planoSubscricaoEmpresa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const updatePlanoSubscricaoEmpresa = async (req, res) => {
    try {
        const planosubscricao = await PlanoSubscricaoEmpresa.findAll({
            where: {
                empresa_id: req.body.empresa_id || req.body.id,
            }
        });
        if (!planosubscricao) {
            return res.json({ Error: "Plano de subscricao não encontrado" });
        }
        await PlanoSubscricaoEmpresa.update({
            empresa_id: req.body.empresa_id || req.body.id,
            plano_subscricao_id: req.body.plano_subscricao_id,
        }, {
            where: {
                empresa_id: req.body.empresa_id || req.body.id,
            }
        }
        );
        return res.json({ Status: "Success", planosubscricao: planosubscricao });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const deletePlanoSubscricaoEmpresa = async (req, res) => {
    try {
        const planoSubscricaoEmpresa = await PlanoSubscricaoEmpresa.findByPk(req.params.id);
        if (!planoSubscricaoEmpresa) {
            return res.json({ Error: "Plano de subscricao não encontrado" });
        }
        await planoSubscricaoEmpresa.destroy();
        return res.json({ Status: "Success", planoSubscricaoEmpresa: planoSubscricaoEmpresa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const associarplanosubscricaoempresa = async (req, res) => {
    try {
        const tipoplano = await PlanoSubscricaoEmpresa.findAll({
            where: {
                empresa_id: req.body.id || req.body.empresa_id
            },
        });
        if (tipoplano.length == 0) {

            const create = await PlanoSubscricaoEmpresa.create({
                empresa_id: req.body.id || req.body.empresa_id,
                plano_subscricao_id: req.body.plano_subscricao_id || req.body.id
            });
            if (!create)
                return res.json({ Error: "Erro ao associar plano de subscrição" });
            return res.json({ Status: "Success", create: create });
        }
        return res.json({ Status: "Existe", tipoplano: tipoplano });
    } catch (error) {
        return res.json({ Error: error });
    }
}



export {
    getPlanoSubscricaoEmpresas,
    getPlanoSubscricaoEmpresaById,
    createPlanoSubscricaoEmpresa,
    updatePlanoSubscricaoEmpresa,
    deletePlanoSubscricaoEmpresa,
    associarplanosubscricaoempresa
}   