
import ServicoHasTarefa from "../models/servicosHasTarefas.js";

const getServicoHasTarefas = async (req, res) => {
    try {
        const servicoHasTarefas = await ServicoHasTarefa.findAll();
        return res.json({ Status: "Success", servicoHasTarefas: servicoHasTarefas });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getServicoHasTarefaById = async (req, res) => {
    try {
        const servicoHasTarefa = await ServicoHasTarefa.findByPk(req.params.id);
        if (!servicoHasTarefa) {
            return res.json({ Error: "ServiçoHasTarefa não encontrado" });
        }
        return res.json({ Status: "Success", servicoHasTarefa: servicoHasTarefa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const createServicoHasTarefa = async (req, res) => {
    try {
        const servicoHasTarefa = await ServicoHasTarefa.create(req.body);
        return res.json({ Status: "Success", servicoHasTarefa: servicoHasTarefa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const updateServicoHasTarefa = async (req, res) => {
    try {
        const servicoHasTarefa = await ServicoHasTarefa.findByPk(req.params.id);
        if (!servicoHasTarefa) {
            return res.json({ Error: "ServiçoHasTarefa não encontrado" });
        }
        await servicoHasTarefa.update(req.body);
        return res.json({ Status: "Success", servicoHasTarefa: servicoHasTarefa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const deleteServicoHasTarefa = async (req, res) => {
    try {
        const servicoHasTarefa = await ServicoHasTarefa.findByPk(req.params.id);
        if (!servicoHasTarefa) {
            return res.json({ Error: "ServiçoHasTarefa não encontrado" });
        }
        await servicoHasTarefa.destroy();
        return res.json({ Status: "Success", servicoHasTarefa: servicoHasTarefa });
    } catch (error) {
        return res.json({ Error: error });
    }
}

export {
    getServicoHasTarefas,
    getServicoHasTarefaById,
    createServicoHasTarefa,
    updateServicoHasTarefa,
    deleteServicoHasTarefa
}
