import TipoServico from '../models/tipoServicos.js';

const getTipoServicos = async (req, res) => {
  try {
    const tipoServico = await TipoServico.findAll({
      order: [['tipo_servico_id', 'ASC']]
    });
    res.json({ Status: "Success", tipoServico: tipoServico });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getTipoServico = async (req, res) => {
  try {
    const tipoServico = await TipoServico.findByPk(req.params.tipo_servico_id);
    res.json({ Status: "Success", tipoServico: tipoServico });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const createTipoServico = async (req, res) => {
  try {
    const { nome } = req.body;

    const tipoServico = await TipoServico.create({
      nome: nome
    });

    res.json({ status: "Success", tipoServico });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTipoServico = async (req, res) => {
  try {
    const { nome } = req.body;
    const tipoServicoId = req.params.id;

    const tipoServico = await TipoServico.update({
      nome: nome
    }, {
      where: {
        tipo_servico_id: tipoServicoId
      }
    });

    res.json({ status: "Success", tipoServico });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteTipoServico = async (req, res) => {
  try {
    const tipoServicoId = req.params.id;

    const tipoServico = await TipoServico.destroy({
      where: {
        tipo_servico_id: tipoServicoId
      }
    });

    res.json({ status: "Success", tipoServico });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  getTipoServicos,
  createTipoServico,
  updateTipoServico,
  deleteTipoServico,
  getTipoServico
};


