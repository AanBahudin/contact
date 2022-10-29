const { StatusCodes } = require("http-status-codes")

const getProfile = async(req, res) => {
    res.status(StatusCodes.OK).json({...req.user})
}

const updateEmailAndName = async(req, res) => {
    res.send('update name & email')
}

const updatePassword = async(req, res) => {
    const {oldPass, newPass} = req.body

    res.send('update user password')
}

const deleteAccount = async(req, res) => {
    res.send('delete account')
}

module.exports = {
    getProfile,
    updateEmailAndName,
    updatePassword
}