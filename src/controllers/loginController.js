import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import ContaUtilizador from '../models/contaUtilizadores.js';


const verificarCredenciais = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await ContaUtilizador.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(401).json({ error: "Utilizador não encontrado" });
    }

    const hash = user.password;

    bcrypt.compare(password, hash, async function (err, result) {
      if (err) {
        console.error(err);

        return res.status(500).json({ error: "Password errada" });
      }

      // if (result) {
      //     const token = jwt.sign({ id: user.conta_utilizador_id }, config.jwtSecret, { expiresIn: '1h' });
      //     return res.json({ Status: 'Success',token: token, userId: user.conta_utilizador_id});

      // } 
      if (result) {
        const token = jwt.sign({ id: user.conta_utilizador_id }, config.jwtSecret);
        return res.json({ Status: 'Success', token: token, userId: user.conta_utilizador_id });
      } else {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export {
  verificarCredenciais
};
