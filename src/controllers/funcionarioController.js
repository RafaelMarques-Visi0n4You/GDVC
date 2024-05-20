import Funcionario from '../models/funcionarios.js';
import equipa from '../models/equipas.js';

const getFuncionarios = async (req, res) => {
    try {
        const funcionarios = await Funcionario.findAll({
            order: [
                ['funcionario_id', 'ASC']
            ],
            where: {
                empresa_id: req.body.empresa_id
            },
            include: [
                {
                    model: equipa,
                    attributes: ['nome'],
                },
            ]

        }
        );


        res.json({ Status: "Success", funcionarios: funcionarios });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getFuncionariosChefeEquipa = async (req, res) => {
    try {
        const funcionarios = await Funcionario.findAll({
            where: {
                equipa_id: req.body.equipa_id,
                empresa_id: req.body.empresa_id
            }
        });
        res.json({ Status: "Success", funcionarios: funcionarios });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getReponsvaelDepartamento = async (req, res) => {
    try {
        const responsavelDepartamento = await Funcionario.findAll({
            where: {
                departamento_id: req.body.departamento_id,
                empresa_id: req.body.empresa_id
            }
        });
        res.json({ Status: "Success", responsavelDepartamento: responsavelDepartamento });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getfuncionariosequipa = async (req, res) => {
    try {
        const funcionarios = await Funcionario.findAll({
            where: {
                equipa_id: req.body.equipa_id
            }
        });
        res.json({ Status: "Success", funcionarios: funcionarios });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getFuncionario = async (req, res) => {
    try {
        const funcionario = await Funcionario.findByPk(req.params.id);
        res.json({ Status: "Success", funcionario: funcionario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createFuncionario = async (req, res) => {
    try {
        const funcionario = await Funcionario.create(req.body);
        res.json({ Status: "Success", funcionario: funcionario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateFuncionario = async (req, res) => {
    try {
        const funcionario = await Funcionario.findByPk(req.params.id);
        if (funcionario) {
            const updatedfuncionario = await Funcionario.update(req.body, {
                where: { funcionario_id: req.params.id }
            });
            res.json({ Status: "Success", funcionario: updatedfuncionario });
        } else {
            res.status(404).json({ error: "Funcionario não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteFuncionario = async (req, res) => {
    try {
        const funcionario = await Funcionario.findByPk(req.params.id);
        if (funcionario) {
            funcionario.destroy();
            res.json({ Status: "Success", funcionario: funcionario });
        } else {
            res.status(404).json({ error: "Funcionario não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const setAcesso = async (req, res) => {
    try {
        const acesso = await Funcionario.findByPk(req.params.id);
        if (!acesso) {
            res.status(404).json({ error: "Funcionário não encontrado" });
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
    getFuncionarios,
    getFuncionario,
    createFuncionario,
    updateFuncionario,
    deleteFuncionario,
    getFuncionariosChefeEquipa,
    getfuncionariosequipa,
    getReponsvaelDepartamento,
    setAcesso
}