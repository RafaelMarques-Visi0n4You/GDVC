import jwt from 'jsonwebtoken';
import config from '../config.js';

const verificarToken = (req, res, next) => {
  let token = req.headers.authorization;
  token = token.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: 'Token Inválido' });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ error: 'Sem autorização ' });
    }

    req.userId = decoded.id;
    next();
  });
};

export default verificarToken;
