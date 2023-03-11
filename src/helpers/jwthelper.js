
const jwt = require('jsonwebtoken'); // importer JsonWebToken

exports.generateToken = (payload, secret, dateExpiration) =>{
    var usrToken = jwt.sign(
        payload, 
        secret, 
        {expiresIn: dateExpiration }
    )
    return usrToken
}