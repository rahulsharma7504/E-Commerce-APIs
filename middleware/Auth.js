const jwt = require('jsonwebtoken');
const SecKey = require('../config/config');

const JWT = (req, res, next) => {
    const token = req.headers['authorization'] || req.body.authorization || req.query.authorization;

    if (!token) return res.status(401).send({ msg: 'Token not found' });

    try {
      let TOKEN = jwt.verify(token, SecKey.secrateKey);
        console.log('Decoded token:', TOKEN);
        next();
    } catch (error) {
        const responses = {
            TokenExpiredError: 'Token expired',
            JsonWebTokenError: 'Invalid token',
        };

        return res.status(401).send(responses[error.name] || 'Internal server error');
    }
};

module.exports = JWT;
