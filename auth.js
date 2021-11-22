const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_TOKEN = process.env.JWT_TOKEN

const verifyToken = (req, res, next) => {
    let token = req.cookies

    if(!token){
        return res.status(403).send({message:'A token is required for authentication'})
    }

    try {
        let verify = jwt.verify(token.token, JWT_TOKEN)
    } catch (error) {
        return res.status(401).send({message:'Invalid token'})
    }

    return next()
}

module.exports = verifyToken