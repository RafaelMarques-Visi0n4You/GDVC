import bcrypt from 'bcrypt';
import ContaUtilizador from '../models/contaUtilizadores.js';
import Funcionario from '../models/funcionarios.js';

const getUser = async (req, res) => {
  try {
    const user = await ContaUtilizador.findAll({
      attributes: { exclude: ['password'] },
      include: { model: Funcionario, attributes: ['nome_completo', 'email'] },
      order: [['conta_utilizador_id', 'ASC']]
    });
    res.json({ Status: "Success", user: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    // Criar usuário usando Sequelize
    const user = await ContaUtilizador.create({
      email: email,
      password: hashedPassword,
      tipo_utilizador: 'nivel1',
      ativo: 1,
      reset: 0,
      funcionario_id: req.body.funcionario_id,
    });

    res.json({ status: "Success", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export {
  getUser,
  createUser,
};
