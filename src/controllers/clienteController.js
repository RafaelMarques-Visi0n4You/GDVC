const Cliente = require('../models/clientes');

const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json({ Status : "Success", clientes: clientes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        res.json({Status : "Success", cliente: cliente });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createCliente = async (req, res) => {
    try {
        const cliente = await Cliente.create(req.body);
        res.json({ Status : "Success", cliente: cliente });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (cliente) {
            cliente.update(req.body);
            res.json({ Status : "Success", cliente: cliente });
        } else {
            res.status(404).json({ error: "Cliente não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (cliente) {
            cliente.destroy();
            res.json({ Status : "Success", cliente: cliente });
        } else {
            res.status(404).json({ error: "Cliente não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getClientes,
    getCliente,
    createCliente,
    updateCliente,
    deleteCliente
}
