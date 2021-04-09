const jwt = require('jsonwebtoken');
const config = require('../config');
verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1];
  //if (token == null) return res.sendStatus(401)
  jwt.verify(token, config.secretKey, (err, decoded) => {
    console.log(err);
    if (err) {
      return res.status(403).json({
        auth: false,
        message: 'Fail to Authentication. Error -> ' + err
      });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;