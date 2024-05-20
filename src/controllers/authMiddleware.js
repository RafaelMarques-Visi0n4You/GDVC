const jwt = require('jsonwebtoken');
const config = require('../config');

exports.verificarToken = (req, res, next) => {
  let token = req.headers.authorization;
  // remove Bearer do token
  // console.log(token + " token no verificar middleware");
  token = token.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: 'Token doesnt exist' });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.userId = decoded.id; // Extrai o ID do objeto decodificado
    next();
  });
};