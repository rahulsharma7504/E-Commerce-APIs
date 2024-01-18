const SecKey=require('../config/config');
const jwt = require('jsonwebtoken');

const JWT = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['token'];
    if (!token) {
        res.status(200).send({ msg: "Token not found" });
    }
    try {
        jwt.verify(token, SecKey.secrateKey, (err, decoded) => {
            if (err) throw err;
            req.user = decoded;
            res.status(200).send({ mes: "Successfully token has been verified" });
            console.log(decoded)
            next();
        });
    } catch (error) {
        res.status(400).send('Token error: ' + error.message);
    }
};

module.exports=JWT