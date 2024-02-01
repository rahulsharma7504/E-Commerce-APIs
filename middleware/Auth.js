const SecKey = require('../config/config');
const jwt = require('jsonwebtoken');

const JWT = async (req, res, next) => {
  
  const Token = req.body.Authorization || req.query.Authorization || req.headers['Authorization'] || req.headers['Authorization']; // Also check Authorization header
  if (!Token) {
    return res.status(401).send({ msg: "Token not found" }); // Use 401 for unauthorized
  }try {
    const decoded = jwt.verify(Token, SecKey.secrateKey);
    console.log(decoded.foo);
    console.log('Decoded token:', decoded);
    next();
  } catch (error) {
    if (error) {
      return res.status(401).send('Token expired');
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send('Invalid token');
    } else {
      console.error('Unexpected error:', error);
      return res.status(500).send('Internal server error');
    }
  }
  
    
  
};

module.exports = JWT;
