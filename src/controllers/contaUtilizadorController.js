
import ContaUtilizador from '../models/contaUtilizadores.js';
import funcionarios from '../models/funcionarios.js';
import clientes from '../models/clientes.js';

import bcrypt from 'bcrypt';

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
        });
        res.json({ Status: "Success", contaUtilizadores: contaUtilizadores });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getcontasclientesempresa = async (req, res) => {
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
                    model: clientes,
                    attributes: ['nome_completo'],
                    where: {
                        empresa_id: req.body.empresa_id
                    }
                },
            ],
           
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
        const  {password } = req.body;

        const hashedPassword = await bcrypt.hash(password.toString(), 10);
        if (
          (req.body.funcionario_id === null || req.body.funcionario_id === 0) &&
          (req.body.cliente_id === null || req.body.cliente_id === 0)
        ){
            return res.status(400).json({ error: 'funcionario_id ou cliente_id é obrigatório' });
        }
        if (
            (req.body.funcionario_id !== null || req.body.funcionario_id !== 0) ||
            (req.body.cliente_id !== null || req.body.cliente_id !== 0)
          ){

        

        const contaUtilizador = await ContaUtilizador.create({
            email : req.body.email,
            password : hashedPassword,
            tipo_utilizador : req.body.tipo_utilizador,
            reset : 0,
            funcionario_id : req.body.funcionario_id,
            cliente_id : req.body.cliente_id,
            criado_por_id : req.body.conta_utilizador_id,
        }, {
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
            contaUtilizador.update({
                where: { conta_utilizador_id: req.params.id },
                email: req.body.email,
                tipo_utilizador: req.body.tipo_utilizador,
                funcionario_id: req.body.funcionario_id,
                cliente_id: req.body.cliente_id,
            });
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

const todascontas = async (req, res) => {
    try {
        const contasFuncionarios = await ContaUtilizador.findAll({
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
                    where: { empresa_id: req.body.empresa_id }
                }
            ]
        });

        const contasClientes = await ContaUtilizador.findAll({
            order: [
                ['conta_utilizador_id', 'ASC']
            ],
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: clientes,
                    attributes: ['nome_completo'],
                    where: { empresa_id: req.body.empresa_id }
                }
            ]
        });

        const contadupla = await ContaUtilizador.findAll({
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
                    where: { empresa_id: req.body.empresa_id }
                },
                {
                    model: clientes,
                    attributes: ['nome_completo'],
                    where: { empresa_id: req.body.empresa_id }
                }
            ]
        });

        res.json({ Status: "Success", contasFuncionarios, contasClientes, contadupla });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
   
export {
    getContaUtilizadores,
    getContaUtilizador,
    createContaUtilizador,
    updateContaUtilizador,
    deleteContaUtilizador,
    getContaUtilizadoresEmpresa,
    setAcesso,
    getcontasclientesempresa,
    todascontas
}