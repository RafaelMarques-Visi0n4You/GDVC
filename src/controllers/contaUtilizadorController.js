import ContaUtilizador from '../models/contaUtilizadores.js';
import funcionarios from '../models/funcionarios.js';

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
        const contaUtilizador = await ContaUtilizador.create(req.body, {
            attributes: {
                exclude: ['password']
            }
        }
        );
        res.json({ Status: "Success", contaUtilizador: contaUtilizador });
    } catch (error) {
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

export {
    getContaUtilizadores,
    getContaUtilizador,
    createContaUtilizador,
    updateContaUtilizador,
    deleteContaUtilizador
}