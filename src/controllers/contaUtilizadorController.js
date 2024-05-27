import { or, where } from 'sequelize';
import ContaUtilizador from '../models/contaUtilizadores.js';
import funcionarios from '../models/funcionarios.js';
import Cliente from '../models/clientes.js';

const getContaUtilizadores = async (req, res) => {
    try {
        const contaUtilizadores = await ContaUtilizador.findAll({
            attributes: {
                exclude: ['password']
            },

            include: [
                {
                    model: funcionarios,
                    attributes: ['nome_completo'],
                },
            ]
        });
        res.json({ Status: "Success", contaUtilizadores: contaUtilizadores });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getContaUtilizadoresEmpresa = async (req, res) => {
    try {
        const contaUtilizadores = await ContaUtilizador.findAll({
            order: [
                ['conta_utilizador_id', 'ASC']
            ],
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: funcionarios,
                   
                    attributes: ['nome_completo'],
                    where: {
                        empresa_id: req.body.empresa_id
                    }
                },
            ],
            include: [
                {
                    model: Cliente,
                    attributes: ['nome_completo'],
                    where: {
                        empresa_id: req.body.empresa_id
                    }
                },
            ]
        });
        res.json({ Status: "Success", contaUtilizadores: contaUtilizadores });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getContaUtilizador = async (req, res) => {
    try {
        const contaUtilizador = await ContaUtilizador.findByPk(req.params.id, {
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: funcionarios,
                    attributes: ['nome_completo'],
                },
            ]
        }
        );
        res.json({ Status: "Success", contaUtilizador: contaUtilizador });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createContaUtilizador = async (req, res) => {
    try {
        if (
          (req.body.funcionario_id === null || req.body.funcionario_id === 0) &&
          (req.body.cliente_id === null || req.body.cliente_id === 0)
        ){
            return res.status(400).json({ error: 'funcionario_id ou cliente_id é obrigatório' });
        }
        if (
            (req.body.funcionario_id !== null || req.body.funcionario_id !== 0) &&
            (req.body.cliente_id !== null || req.body.cliente_id !== 0)
          ){
        const contaUtilizador = await ContaUtilizador.create(req.body, {
            attributes: {
                exclude: ['password']
            }
        }
        );
        res.json({ Status: "Success", contaUtilizador: contaUtilizador });
    } }catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateContaUtilizador = async (req, res) => {
    try {
        const contaUtilizador = await ContaUtilizador.findByPk(req.params.id, {
            attributes: {
                exclude: ['password']
            }
        }
        );
        if (contaUtilizador) {
            contaUtilizador.update(req.body);
            await contaUtilizador.reload();
            res.json({ Status: "Success", contaUtilizador: contaUtilizador });
        } else {
            res.status(404).json({ error: "ContaUtilizador não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteContaUtilizador = async (req, res) => {
    try {
        const contaUtilizador = await ContaUtilizador.findByPk(req.params.id);
        if (contaUtilizador) {
            contaUtilizador.destroy();
            res.json({ Status: "Success", contaUtilizador: contaUtilizador });
        } else {
            res.status(404).json({ error: "ContaUtilizador não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const setAcesso = async (req, res) => {
    try {
        const acesso = await ContaUtilizador.findByPk(req.params.id);
        if (!acesso) {
            res.status(404).json({ error: "ContaUtilizador não encontrado" });
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
    getContaUtilizadores,
    getContaUtilizador,
    createContaUtilizador,
    updateContaUtilizador,
    deleteContaUtilizador,
    getContaUtilizadoresEmpresa,
    setAcesso
}