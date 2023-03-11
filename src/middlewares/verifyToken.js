const jwt = require('jsonwebtoken');
const guardUserAccess = require('./guardUsersAccess');

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    //if token not found => return 403
    if(!token){
        return res.status(403).send({
            message: "Token not found",
            auth: false,
            token: null
        });
    }

    //use jwt to verify a token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        //Error : token expired, token modified, wrong secret => return 401
        if(err){
            return res.status(401).send({
                message : "Bad token or bad secret or Token has expired",
                auth: false,
                token: null
            })
        }
        req.userToken = decoded
        next();
    })

}

module.exports = verifyToken