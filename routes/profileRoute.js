const { getProfile, updateEmailAndName, updatePassword } = require('../controllers/profileControllers')
const express = require('express')
const router = express.Router()
const {authenticateUser}  = require('../middleware/authenticated')

router.route('/')
    .get(authenticateUser, getProfile)
    .patch(authenticateUser, updateEmailAndName)

router.route('/updatePass')
    .patch(authenticateUser, updatePassword)


module.exports = router