const jwt = require('jsonwebtoken')

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

const createToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
    return token
}

const attachCookiesToResponse = (res, payload) => {
    const token = createToken(payload)
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token', token, {
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        signed: true
    })
}

module.exports = {
    createToken,
    verifyToken,
    attachCookiesToResponse
}