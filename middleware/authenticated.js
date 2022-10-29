const { StatusCodes } = require('http-status-codes')
const {verifyToken}  = require('../utils/jwt')

const authenticateUser = (req, res, next) => {
    const token = req.signedCookies.token

    if(!token) {
        res.send(StatusCodes.UNAUTHORIZED).json({msg: 'cannot make request!'})
    }

    try {
        const payload = verifyToken(token)
        req.user = {name: payload.name, email: payload.email, userId: payload.userId}
        next()
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({msg: 'authenticated failed'})
    }
}

module.exports = {
    authenticateUser
}