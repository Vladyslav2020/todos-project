const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS'){
        return next();
    }
    try{
        const token = req.headers.authorization;
        if (!token){
            return res.status(401).json("No authorization");
        }
        const decoded = jwt.verify(token, config.get('jwtSecretKey'));
        req.user = decoded;
        next();
    }
    catch(err) {
        console.log("Auth error", err.message);
        return res.status(401).json("No authorization");
    }
}