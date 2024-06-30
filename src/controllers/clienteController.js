import Cliente from '../models/clientes.js';
import Contratos from '../models/contratos.js';

const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll({
            order: [
                ['cliente_id', 'ASC']
            ]
        });
        res.json({ Status: "Success", clientes: clientes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        res.json({ Status: "Success", cliente: cliente });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createCliente = async (req, res) => {
    try {
        const cliente = await Cliente.create(req.body);
        console.log(req.body);
        res.json({ Status: "Success", cliente: cliente });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);

        if (cliente) {
            await Cliente.update(req.body, {
                where: {
                    cliente_id: req.params.id || req.body.cliente_id
                }
            });
            res.json({ Status: "Success", cliente: cliente });
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
            res.json({ Status: "Success", cliente: cliente });
        } else {
            res.status(404).json({ error: "Cliente não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const setAcesso = async (req, res) => {
    try {
        const acesso = await Cliente.findByPk(req.params.id);
        if (!acesso) {
            res.status(404).json({ error: "Cliente não encontrado" });
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

const getMyClients = async (req, res) => {
    try {
        const clientes = await Cliente.findAll({
            where: {
                empresa_id: req.body.id || req.body.empresa_id
            },
            order: [
                ['cliente_id', 'ASC']
            ],
            include: [
                {
                    model: Contratos,
                    attributes: ['contrato_id', 'nome'], 
                },
    
            ]
        });
        res.json({ Status: "Success", clientes: clientes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




export {
    getClientes,
    getCliente,
    createCliente,
    updateCliente,
    deleteCliente,
    setAcesso,
    getMyClients
}