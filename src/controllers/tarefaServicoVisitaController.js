const TarefaServicoVisita = require("../models/tarefasServicosVisita");

const getTarefasServicosVisita = async (req, res) => {
    try {
        const tarefasServicosVisita = await TarefaServicoVisita.findAll();
        return res.json({ Status: "Success", tarefasServicosVisita: tarefasServicosVisita });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const getTarefaServicoVisitaById = async (req, res) => {
    try {
        const tarefaServicoVisita = await TarefaServicoVisita.findOne({
            where: {
                servico_has_tarefas_id: req.params.id1,
                visita_id: req.params.id2
            }
        });
        if (!tarefaServicoVisita) {
            return res.json({ Error: "TarefaServicoVisita não encontrado" });
        }
        return res.json({ Status: "Success", tarefaServicoVisita: tarefaServicoVisita });
    } catch (error) {
        return res.json({ Error: error });
    }
}

const createTarefaServicoVisita = async (req, res) => {
    try {

        req.body.estado = "em andamento";

        const tarefaServicoVisita = await TarefaServicoVisita.create(req.body);
        return res.json({ Status: "Success", tarefaServicoVisita: tarefaServicoVisita });
    } catch (error) {
        console.log(error);
        return res.json({ Error: error });
    }
}

const updateStateTarefaServicoVisita = async (req, res) => {
    try {
        const tarefaServicoVisita = await TarefaServicoVisita.findByPk(req.body.id);
        if (!tarefaServicoVisita) {
            return res.json({ Error: "TarefaServicoVisita não encontrado" });
        }

        // Alternar entre 'em andamento' e 'concluido'
        const novoEstado = tarefaServicoVisita.estado === 'em andamento' ? 'concluido' : 'em andamento';

        // Atualizar o estado da tarefa para o novo estado
        await tarefaServicoVisita.update({ estado: novoEstado });

        return res.json({ Status: "Success", tarefaServicoVisita: tarefaServicoVisita });
    } catch (error) {
        return res.json({ Error: error });
    }
}


const deleteTarefaServicoVisita = async (req, res) => {
    try {
        const tarefaServicoVisita = await TarefaServicoVisita.findByPk(req.params.id);
        if (!tarefaServicoVisita) {
            return res.json({ Error: "TarefaServicoVisita não encontrado" });
        }
        await tarefaServicoVisita.destroy();
        return res.json({ Status: "Success", tarefaServicoVisita: tarefaServicoVisita });
    } catch (error) {
        return res.json({ Error: error });
    }
}

module.exports = {
    getTarefasServicosVisita,
    getTarefaServicoVisitaById,
    createTarefaServicoVisita,
    updateStateTarefaServicoVisita,
    deleteTarefaServicoVisita
}

