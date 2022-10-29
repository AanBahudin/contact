const { getProfile, updateEmailAndName, updatePassword, deleteAccount } = require('../controllers/profileControllers')
const express = require('express')
const router = express.Router()
const {authenticateUser}  = require('../middleware/authenticated')

router.route('/')
    .get(authenticateUser, getProfile)
    .delete(authenticateUser, deleteAccount)
    .patch(authenticateUser, updateEmailAndName)

router.route('/updatePass')
    .patch(authenticateUser, updatePassword)


module.exports = router