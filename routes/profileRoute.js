const { getProfile, updateEmailAndName, updatePassword } = require('../controllers/profileControllers')
const express = require('express')
const router = express.Router()

router.route('/')
    .get(getProfile)
    .patch(updateEmailAndName)

router.route('/updatePass')
    .patch(updatePassword)


module.exports = router