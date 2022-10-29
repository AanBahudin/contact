const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {createToken, attachCookiesToResponse} = require('../utils/jwt')

const signUpUser = async(req, res) => {
    const {name, email, password} = req.body

    if (!name || !email || !password || password.length < 8) {
        res.status(StatusCodes.BAD_REQUEST).json({data: [], status: {success: false, msg: 'please provide correct credentials!'}})
    }

    const duplicatedEmail = await User.findOne({email})
    if(duplicatedEmail) {
        res.status(StatusCodes.BAD_REQUEST).json({data: [], status: {success: false, msg: 'try use different email!'}})
    }

    const user = await User.create({name, email, password})
    res.status(StatusCodes.CREATED).json({success: true, data: user})
    

}

const loginUser = async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({success: false, msg: 'provide proper credentials'})
    }

    const user = await User.findOne({email})
    if(!user) {
        res.status(StatusCodes.BAD_REQUEST).json({sucess: false, msg: 'cannot find email, please try again or sign up'})
    }

    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch) {
        res.status(StatusCodes.BAD_REQUEST).json({success: false, msg: 'Wrong password, please try again later!'})
    }

    const payload = {name: user.name, userId: user._id, email: user.email}
    createToken(payload)

    attachCookiesToResponse(res, payload)
    res.status(StatusCodes.OK).json({user:payload, success: true, msg: 'Successfully login!'})
}

const logout = async(req, res) => {
    res.cookie('token', 'logout', {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(StatusCodes.OK).json({success: true, msg: 'logout successfully'})
}

module.exports = {
    loginUser,
    signUpUser,
    logout
}