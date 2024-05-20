import servico from '../models/servicos.js';

const getServicos = async (req, res) => {
    try {
        const servicos = await servico.findAll({
            order:
                [['servico_id', 'ASC']]
        });
        res.json({ Status: "Success", servicos: servicos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getServicosEmpresa = async (req, res) => {

    try {
        const servicos = await servico.findAll({
            where: {
                empresa_id: req.body.empresa_id
            }
        });
        res.json({ Status: "Success", servicos: servicos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getServico = async (req, res) => {
    try {
        const servicos = await servico.findByPk(req.params.id);
        res.json({ Status: "Success", servicos: servicos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createServico = async (req, res) => {
    try {
        const servicos = await servico.create(req.body);
        console.log(servicos);
        res.json({ Status: "Success", servicos: servicos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateServico = async (req, res) => {
    try {
        const servicos = await servico.findByPk(req.params.id);
        if (servicos) {
            // Adicione a cláusula 'where' com o ID do serviço que você deseja atualizar
            await servico.update(req.body, {
                where: {
                    servico_id: req.params.id
                }
            });
            res.json({ Status: "Success", servicos: servicos });
        } else {
            res.status(404).json({ error: "Servico não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteServico = async (req, res) => {
    try {
        const servicos = await servico.findByPk(req.params.id);
        if (servicos) {
            servicos.destroy();
            res.json({ Status: "Success", servicos: servicos });
        } else {
            res.status(404).json({ error: "Servico não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const setAcesso = async (req, res) => {
    try {
        const acesso = await servico.findByPk(req.params.id);
        if (!acesso) {
            res.status(404).json({ error: "Serviço não encontrado" });
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
    getServicos,
    getServico,
    createServico,
    updateServico,
    deleteServico,
    getServicosEmpresa,
    setAcesso
}