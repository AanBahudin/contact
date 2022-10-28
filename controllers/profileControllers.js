
const getProfile = async(req, res) => {
    res.send('get profile')
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