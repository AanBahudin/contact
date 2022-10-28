
const loginUser = async(req, res) => {
    res.send('login controllers')
}

const signUpUser = async(req, res) => {
    res.send('signup controllers')
}

const logout = async(req, res) => {
    res.send('logout controllers')
}

module.exports = {
    loginUser,
    signUpUser,
    logout
}