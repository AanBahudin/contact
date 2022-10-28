const { loginUser, logout, signUpUser } = require('../controllers/authControllers')
const express = require('express')
const router = express.Router()

router.route('/login')
    .post(loginUser)

router.route('/signup')
    .post(signUpUser)

router.route('/logout')
    .get(logout)

module.exports = router